const Loading = () => {
  return (
    <div className="absolute inset-0 backdrop-blur z-10 flex flex-col gap-y-2 justify-center items-center">
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="black"
      ></l-ring-2>
      <span className="text-lg select-none">Loading</span>
    </div>
  )
}

Loading.displayName = 'loading'

export { Loading }
