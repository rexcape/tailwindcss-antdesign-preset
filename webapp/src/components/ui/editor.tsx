import { Editor as MonacoEditor, type EditorProps } from '@monaco-editor/react'

import theme from '@/theme'

const defaultProps: Partial<EditorProps> = {
  options: {
    minimap: {
      enabled: false,
    },
    tabSize: 2,
    fontFamily: theme.token?.fontFamilyCode,
  },
}

const Editor = (props: EditorProps) => <MonacoEditor {...defaultProps} {...props} />

Editor.displayName = 'editor'

export { Editor }
