import { useMemo } from 'react'
// import { Anchor } from 'antd'
import createPreset from 'tailwindcss-antdesign-preset'

import { Link } from '../ui/link'

import { ColorsPreview } from './colors'
import { FontSizePreview } from './font-size'
import { BorderRadiusPreview } from './border-radius'
import { ScreensPreview } from './screens'
import { ExtendColorsPreview } from './extend-colors'
import { ShadowsPreview } from './shadows'
import { SpacingPreview } from './spacing'
import { SizePreview } from './size'

import { Badge } from './badge'

const PresetPreview = () => {
  const preset = useMemo(() => createPreset(), [])

  return (
    <div id="preview-container" className="flex relative py-8">
      <div className="container px-4 lg:px-0 flex-1 mx-auto flex flex-col gap-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="color" className="text-h3 font-medium flex-1">
              Color
              <Badge type="override" className="ml-2">
                Override
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/customizing-colors">
              TailwindCSS
            </Link>
            <Link className="flex-none md:mx-4" href="https://ant.design/docs/spec/colors">
              Ant Design
            </Link>
          </div>
          <ColorsPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="font-size" className="text-h3 font-medium flex-1">
              Font Size
              <Badge type="override" className="ml-2">
                Override
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/font-size">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#maptoken"
            >
              Ant Design
            </Link>
          </div>
          <FontSizePreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="border-radius" className="text-h3 font-medium flex-1">
              Border Radius
              <Badge type="override" className="ml-2">
                Override
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/border-radius">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#maptoken"
            >
              Ant Design
            </Link>
          </div>
          <BorderRadiusPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="screen" className="text-h3 font-medium flex-1">
              Screens
              <Badge type="override" className="ml-2">
                Override
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/screens">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#aliastoken"
            >
              Ant Design
            </Link>
          </div>
          <ScreensPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="semantic-color" className="text-h3 font-medium flex-1">
              Semantic color
              <Badge type="extend" className="ml-2">
                Extend
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/customizing-colors">
              TailwindCSS
            </Link>
            <Link className="flex-none md:mx-4" href="https://ant.design/docs/spec/colors">
              Ant Design
            </Link>
          </div>
          <ExtendColorsPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="shadow" className="text-h3 font-medium flex-1">
              Shadow
              <Badge type="extend" className="ml-2">
                Extend
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/box-shadow">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#aliastoken"
            >
              Ant Design
            </Link>
          </div>
          <ShadowsPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="spacing" className="text-h3 font-medium flex-1">
              Spacing
              <Badge type="extend" className="ml-2">
                Extend
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/customizing-spacing">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#aliastoken"
            >
              Ant Design
            </Link>
          </div>
          <SpacingPreview preset={preset} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center">
            <h3 id="size" className="text-h3 font-medium flex-1">
              Size
              <Badge type="extend" className="ml-2">
                Extend
              </Badge>
            </h3>
            <Link className="flex-none" href="https://tailwindcss.com/docs/size">
              TailwindCSS
            </Link>
            <Link
              className="flex-none md:mx-4"
              href="https://ant.design/docs/react/customize-theme#aliastoken"
            >
              Ant Design
            </Link>
          </div>
          <SizePreview preset={preset} />
        </div>
      </div>

      {/* <div className="hidden xl:block fixed top-42 right-6">
        <Anchor
          showInkInFixed
          items={[
            { key: 'color', href: '#color', title: 'Color' },
            { key: 'font-size', href: '#font-size', title: 'Font Size' },
            { key: 'border-radius', href: '#border-radius', title: 'Border Radius' },
            { key: 'screen', href: '#screen', title: 'Screen' },
            { key: 'semantic-color', href: '#semantic-color', title: 'Semantic Color' },
            { key: 'shadow', href: '#shadow', title: 'Shadow' },
            { key: 'spacing', href: '#spacing', title: 'Spacing' },
            { key: 'size', href: '#size', title: 'Size' },
          ]}
        />
      </div> */}
    </div>
  )
}

export { PresetPreview }
