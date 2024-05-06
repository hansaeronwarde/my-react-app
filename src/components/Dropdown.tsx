import React, { useEffect, useState } from 'react'
import API from '../api/axios'

interface CountriesType {
    id: string
    value: string
}

interface StatesType {
    id: string
    value: string
}

const Dropdown: React.FC = () => {
    const [countries, setCountries] = useState<CountriesType[]>([])
    const [states, setStates] = useState<StatesType[]>([])
    const [selectedCountry, setSelectedCountry] = useState<CountriesType>()
    const [selectedState, setSelectedState] = useState<StatesType>()

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await API.get('/countries')
                setCountries(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (countries.length === 0) {
            getCountries()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!selectedCountry) {
            return
        }

        const getState = async () => {
            try {
                const response = await API.get(`/countries/${selectedCountry.id}/states`)
                setStates(response.data)

            } catch (error) {
                console.log(error)
            }
        }

        getState()

    }, [selectedCountry])

    const handleSelectCountriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(countries.find(country => String(country.id) === event.target.value));
    };

    const handleSelectStatesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(states.find(state => String(state.id) === event.target.value));
    };

    const handleSubmit = () => {
        alert(`Selected country: ${selectedCountry?.value}\nSelected state: ${selectedState?.value}`)
    }


    return (
        <form className="max-w-sm mx-auto flex flex-col space-y-5" onSubmit={handleSubmit}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" onChange={handleSelectCountriesChange} value={selectedCountry?.id} defaultValue="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="default" disabled>Choose a country</option>
                {countries && countries.map((data, index) => {
                    return <option key={index} value={data.id}>{data.value}</option>
                })}
            </select>
            <select id="countries" onChange={handleSelectStatesChange} defaultValue="default" value={selectedState?.id} disabled={states.length === 0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="default" disabled>Choose a state</option>
                {states && states.map((data, index) => {
                    return <option key={index} value={data.id}>{data.value}</option>
                })}
            </select>
            <button type="submit" disabled={!selectedCountry || !selectedState} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </form>
    )
}

export default Dropdown