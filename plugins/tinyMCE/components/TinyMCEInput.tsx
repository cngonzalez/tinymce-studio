import { Editor } from '@tinymce/tinymce-react'
import React, {useCallback, useRef } from 'react'
import { set, StringInputProps, useClient } from 'sanity'
import {useEffect, useState} from 'react'
import {useSecrets, SettingsView} from '@sanity/studio-secrets'
import styled from 'styled-components'
import {Button, Flex} from '@sanity/ui'
import {PlugIcon} from '@sanity/icons'

const SetupButtonContainer = styled.div`
  position: relative;
  display: block;
  font-size: 0.8em;
  transform: translate(0%, -10%);
`
const namespace = "tinyMCE"

const pluginConfigKeys = [
  {
    key: "tinyMCEKey",
    title: "Key for TinyMCE",
  },
]

interface Secrets {
  secrets: {
    tinyMCEKey: string
  }
}

export const TinyMCEINput = (props: StringInputProps) => {
  //keep track of the editor, per TinyMCE docs
  const editorRef: any = useRef(null)

  //use default onChange from Sanity
  const {elementProps, onChange} = props

  //use the value from Sanity content lake as source of truth
  const {value} = elementProps

  //we're holding our API key for TinyMCE in a secret
  const { secrets } = useSecrets(namespace) as Secrets
  const [showSettings, setShowSettings] = useState(false)
  
  //when the editor changes, patch the content lake
  const handleEditorChange = () => {
    const content = editorRef.current.getContent()
    onChange(set(content))
  }

  //when the component mounts, set the editor content with whats in the content lake
  const onInit = useCallback((evt: any, editor: any) => {
    editorRef.current = editor
    editorRef.current.setContent(value)
    editorRef.current.apiKey = secrets?.tinyMCEKey
  }, [value, secrets])


  return (
    <>
    {!secrets && (
      <SetupButtonContainer>
        <Flex flex={1} justify="flex-end">
          <Button
            color="primary"
            icon={PlugIcon}
            mode="bleed"
            title="Configure"
            onClick={() => setShowSettings(true)}
            tabIndex={1}
          />
        </Flex>
      </SetupButtonContainer>
    )}  
    {
      showSettings && (
        <SettingsView
          title="TinyMCE"
          namespace={namespace}
          keys={pluginConfigKeys}
          onClose={() => setShowSettings(false)}
        />
      )
    }
    {
      secrets && (
      <Editor
        onInit={onInit}
        apiKey={secrets?.tinyMCEKey}
        value={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'lists', 'link', 'image',
            'fullscreen',
            'media', 'table'
          ],
          toolbar: 'undo redo | formatselect | ' +
          ' | bold italic | ' +
          '| bullist numlist table | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          table_toolbar: 'tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablemergecells | tabledelete',
          table_resize_bars: false,

        }}
        onEditorChange={handleEditorChange}
        />
      )
    }
    </>
  )
}