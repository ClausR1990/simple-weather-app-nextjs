'use client'

import React, { useEffect, useState, Fragment } from 'react'
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
  data: z.array(addressData),
  tekst: z.string(),
  forslagstekst: z.string(),
  caretpos: z.number(),
})

type AddressData = z.infer<typeof addressResponse>

export const SearchBox: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState()
  const [addressData, setAddressData] = useState<AddressData[] | null>(null)

  console.log('🧑🏻', selectedValue)

  useEffect(() => {
    if (inputValue.length < 3) return
    const getAddressData = async (value: string) => {
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

  return (
    <Combobox value={selectedValue} onChange={setSelectedValue}>
      <Combobox.Input
        onChange={event => setInputValue(event.target.value)}
        placeholder="Search address"
        displayValue={(address: AddressData) => address.tekst}
      />
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setInputValue('')}
      >
        <Combobox.Options>
          {addressData &&
            addressData.map((address, index) => (
              <Combobox.Option key={index} value={address}>
                {address.forslagstekst}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}
