export const Skeleton = () => {
  const isJsEnabled = typeof window !== 'undefined'
  return (
    isJsEnabled && (
      <div className="w-72 rounded-lg border-none bg-white px-4 py-3 text-base leading-5 text-gray-900 shadow-md">
        Søg på adresse
      </div>
    )
  )
}
