import { App, Button, Collapse, Input, Popover, Splitter, Switch, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useAsyncFn, useCopyToClipboard, useMap, useMedia } from 'react-use'
import { IconCopy, IconInfoCircleFilled } from '@tabler/icons-react'

import { Editor } from '@/components/ui/editor'
import { Loading } from '@/components/loading'
import { CodeHighlight } from '@/components/code-highlight'

import { generateCode, type JSONTheme } from '@/lib/generate'
import { Link } from '@/components/ui/link'

const GeneratorPage = () => {
  const isLargeScreen = useMedia('(min-width: 768px)')

  const [useDefaultTheme, setUseDefaultTheme] = useState(true)
  const [themeInput, setThemeInput] = useState('')
  const [config, { set: setConfig }] = useMap({
    semanticColorPrefix: '',
  })

  const [{ loading, value, error }, generate] = useAsyncFn(async () => {
    const themeJSON = themeInput ? (JSON.parse(themeInput) as JSONTheme) : undefined
    return generateCode(themeJSON, config)
  }, [themeInput, config])

  useEffect(() => {
    generate()
  }, [])

  const [copyState, copy] = useCopyToClipboard()
  const { message } = App.useApp()

  useEffect(() => {
    if (copyState.error) {
      message.error('Copy failed')
    }
    if (copyState.value) {
      message.success('Copied')
    }
  }, [copyState])

  return (
    <Splitter layout={isLargeScreen ? 'horizontal' : 'vertical'}>
      <Splitter.Panel resizable={isLargeScreen} min="20%">
        <div className="bg-antd-bg-container m-2 p-4 flex flex-col gap-y-2 rounded">
          <div className="flex items-center">
            <h3 className="flex-1 text-lg font-medium">Ant Design Theme</h3>
            <div className="flex items-center gap-2">
              <label htmlFor="default-theme-switch">Use default theme</label>
              <Switch
                id="default-theme-switch"
                value={useDefaultTheme}
                size="small"
                onChange={(val) => setUseDefaultTheme(val)}
              />
            </div>
          </div>
          {!useDefaultTheme && (
            <div>
              <p className="text-antd-text-description">
                Design your custom theme at{' '}
                <Link href="https://ant.design/theme-editor">ant design theme editor</Link>, click
                the "config" button at top right. Copy and paste json code here.
              </p>
            </div>
          )}
          <div className="relative border rounded p-1 border-antd-border h-72">
            {useDefaultTheme && (
              <div className="absolute rounded inset-0 backdrop-blur z-10 flex justify-center items-center">
                <span className="text-lg select-none">You are using the default theme</span>
              </div>
            )}
            <Editor
              className="rounded"
              value={themeInput}
              onChange={(val) => setThemeInput(val || '')}
              language="json"
            />
          </div>
          <div>
            <Collapse
              items={[
                {
                  key: 'custom-plugin-options',
                  label: 'Custom Plugin Options',
                  children: (
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      <label
                        htmlFor="option-color-prefix"
                        className="flex justify-end items-center"
                      >
                        <span className="flex gap-1 items-center">
                          Semantic Color Prefix{' '}
                          <Popover
                            title="Explaination"
                            content={
                              <>
                                <p className="text-sm">
                                  This option decides how to use ant design semantic
                                  colors(bg-solid,etc).
                                </p>
                                <p className="text-sm">
                                  For example, if you set it to color, you need to use
                                  bg-color-bg-base for ant design token colorBgBase
                                </p>
                                <p className="text-sm">Note: constant colors will not affected.</p>
                              </>
                            }
                          >
                            <IconInfoCircleFilled className="size-4 text-antd-icon hover:text-antd-icon-hover" />
                          </Popover>
                        </span>
                      </label>

                      <Input
                        id="option-color-prefix"
                        className="col-span-2 sm:col-span-1"
                        value={config.semanticColorPrefix}
                        placeholder="antd"
                        onChange={(e) => {
                          setConfig('semanticColorPrefix', e.target.value)
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                generate()
              }}
            >
              Generate
            </Button>
          </div>
        </div>
      </Splitter.Panel>
      <Splitter.Panel resizable={isLargeScreen} min="35%">
        <div className="bg-antd-bg-container m-2 p-4 flex flex-col gap-y-2 rounded">
          <div className="flex items-center">
            <h3 className="flex-1 text-lg font-medium">Generated Code</h3>
          </div>
          <div className="relative">
            {loading && <Loading />}
            {value && (
              <Tabs
                centered
                type="card"
                defaultActiveKey="tailwind-config"
                items={[
                  {
                    key: 'tailwind-config',
                    label: 'Tailwind Config',
                    children: (
                      <div className="flex flex-col gap-2">
                        <p className="text-antd-text-description">
                          Copy into your tailwind config file, edit and combine with{' '}
                          <Link
                            target="_blank"
                            href="https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js"
                          >
                            tailwindcss default configuration
                          </Link>
                        </p>
                        <div className="relative">
                          <Button
                            type="text"
                            className="absolute right-4 top-4 z-10"
                            icon={<IconCopy className="text-antd-icon size-4" />}
                            onClick={() => copy(value.preset)}
                          />
                          <div className="overflow-auto w-full h-[360px] rounded border border-antd-border p-2">
                            <CodeHighlight code={value.preset} lang="javascript" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'antd-tokens',
                    label: 'Antd Tokens',
                    children: (
                      <div className="flex flex-col gap-2">
                        <p className="text-antd-text-description">
                          You can take a look at all antd tokens here
                        </p>
                        <div className="relative">
                          <Button
                            type="text"
                            className="absolute right-4 top-4 z-10"
                            icon={<IconCopy className="text-antd-icon size-4" />}
                            onClick={() => copy(value.tokens)}
                          />
                          <div className="overflow-auto w-full h-[360px] border rounded border-antd-border p-2">
                            <CodeHighlight code={value.tokens} lang="json" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            )}
            {error && (
              <div>
                <span>{error.name}:</span>
                <span>{error.message}</span>
              </div>
            )}
          </div>
        </div>
      </Splitter.Panel>
    </Splitter>
  )
}

export default GeneratorPage
