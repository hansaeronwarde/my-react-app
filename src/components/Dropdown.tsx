import React, { useEffect, useState } from 'react'
import API from '../api/axios'

interface CountriesType {
    id: string
    value: string
}
const Dropdown: React.FC = () => {
    const [countries, setCountries] = useState<CountriesType[] | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<string>()

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await API.get('/countries')
                setCountries(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (!countries) {
            getCountries()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSelectCountriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <form className="max-w-sm mx-auto flex flex-col space-y-5">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" onChange={handleSelectCountriesChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Choose a country</option>
                {countries && countries.map((data, index) => {
                    return <option key={index} value={data.id}>{data.value}</option>
                })}
            </select>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Choose a country</option>
                {countries && countries.map((data, index) => {
                    return <option key={index} value={data.id}>{data.value}</option>
                })}
            </select>
            <button type="submit" disabled={!selectedCountry} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </form>
    )
}

export default Dropdown