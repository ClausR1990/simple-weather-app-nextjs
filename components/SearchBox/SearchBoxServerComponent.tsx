type SearchBoxServerComponentProps = {
  placeholder: string
  buttonLabel: string
}

export const SearchBoxServerComponent: React.FC<
  SearchBoxServerComponentProps
> = ({ placeholder, buttonLabel }) => {
  return (
    <form action="">
      <div className="grid gap-2 md:grid-cols-2">
        <input
          name="city"
          type="text"
          placeholder={placeholder}
          className="w-full cursor-default overflow-hidden rounded-lg border-none px-4 py-3 text-base leading-5 text-gray-900 shadow-md focus:ring-0 focus-visible:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-lg border-none bg-cyan-600 px-4 py-3 text-base text-white shadow-md"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  )
}
