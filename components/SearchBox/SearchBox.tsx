'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { z } from 'zod'

const addressData = z.object({
  description: z.string(),
  place_id: z.string(),
  structured_formatting: z.object({
    main_text: z.string(),
  }),
})

const addressDetailsComponents = z.object({
  long_name: z.string(),
  short_name: z.string(),
  types: z.array(z.string()),
})

const addressDetailsResponse = z.object({
  result: z.object({
    address_components: z.array(addressDetailsComponents),
    formatted_address: z.string(),
  }),
  status: z.string(),
})

const addressResponse = z.object({
  predictions: z.array(addressData),
  status: z.string(),
})
type AddressData = z.infer<typeof addressData>
type AddressDataReponse = z.infer<typeof addressResponse>
type AddressDetailsResponce = z.infer<typeof addressDetailsResponse>

const SearchBox: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState<AddressData | null>(
    null,
  )
  const [addressData, setAddressData] = useState<AddressDataReponse | null>(
    null,
  )

  useEffect(() => {
    if (inputValue.length < 3) return
    const getAddressData = async (value: string) => {
      const response = await fetch(
        `/addresses/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          value,
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&language=da`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      setAddressData(await response.json())
    }
    getAddressData(inputValue)
  }, [inputValue])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const getAddressDetails = async (placeId: string) => {
    const response = await fetch(
      `/addresses/maps/api/place/details/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&fields=address_components%2Cformatted_address&language=en`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = (await response.json()) as AddressDetailsResponce
    const locality = data.result.address_components.filter(item =>
      item.types.includes('locality'),
    )[0]
    return locality.short_name
  }

  useEffect(() => {
    if (selectedValue && selectedValue.place_id) {
      ;(async () => {
        const placeId = selectedValue.place_id
        const addressDetails = await getAddressDetails(placeId)
        if (addressDetails) {
          router.push(
            pathname +
              '?' +
              createQueryString(
                'city',
                encodeURIComponent(addressDetails.toLowerCase()),
              ),
          )
          setInputValue('')
          setSelectedValue(null)
        }
      })()
    }
  }, [selectedValue, createQueryString, pathname, router])

  const isJsEnabled = typeof window !== 'undefined'

  return (
    isJsEnabled && ( // This component will only render if Javascipt is enabled in the browser
      <div className="w-72 max-w-full">
        <Combobox value={selectedValue} onChange={setSelectedValue}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                onChange={event => setInputValue(event.target.value)}
                placeholder="Søg på adresse"
                displayValue={(address: AddressData) =>
                  address ? address.description : ''
                }
                className="w-full border-none px-4 py-3 text-base leading-5 text-gray-900 focus:ring-0 focus-visible:outline-none"
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setInputValue('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {addressData &&
                  addressData.predictions.map((address, index) => (
                    <Combobox.Option
                      key={index}
                      value={address}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      {address.description}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    )
  )
}

export default SearchBox
