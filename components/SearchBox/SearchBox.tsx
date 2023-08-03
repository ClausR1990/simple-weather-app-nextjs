'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { z } from 'zod'

const addressData = z.object({
  adgangsadresseid: z.string(),
  id: z.string(),
  status: z.number(),
  darstatus: z.number(),
  vejkode: z.string(),
  vejnavn: z.string(),
  adresseringsvejnavn: z.string(),
  husnr: z.string(),
  etage: z.string(),
  dør: z.string(),
  postnr: z.string(),
  postnrnavn: z.string(),
})

const addressResponse = z.object({
  data: z.array(addressData).or(addressData),
  tekst: z.string(),
  forslagstekst: z.string(),
  caretpos: z.number(),
})

type AddressData = z.infer<typeof addressResponse>

export const SearchBox: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [inputValue, setInputValue] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState<AddressData | null>(
    null,
  )
  const [addressData, setAddressData] = useState<AddressData[] | null>(null)

  useEffect(() => {
    if (inputValue.length < 3) return
    const getAddressData = async (value: string) => {
      //TODO change this endpoint to Google Places API
      const response = await fetch(
        `https://api.dataforsyningen.dk/autocomplete?q=${encodeURIComponent(
          value,
        )}&fuzzy`,
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

  useEffect(() => {
    if (
      selectedValue &&
      typeof selectedValue.data === 'object' &&
      !Array.isArray(selectedValue.data)
    ) {
      const value = selectedValue.data.postnrnavn
      if (value) {
        router.push(
          pathname +
            '?' +
            createQueryString('city', encodeURIComponent(value.split(' ')[0])),
        )
        setInputValue('')
        setSelectedValue(null)
      }
    }
  }, [selectedValue, createQueryString, pathname, router])

  return (
    <div className="w-72 max-w-full">
      <Combobox value={selectedValue} onChange={setSelectedValue}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              onChange={event => setInputValue(event.target.value)}
              placeholder="Search address"
              displayValue={(address: AddressData) =>
                address ? address.tekst : ''
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
                addressData.map((address, index) => (
                  <Combobox.Option
                    key={index}
                    value={address}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {address.forslagstekst}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
