import React, { useEffect, useState } from "react"
import "./poke.css"


const poke = () => {
    const [tsearch, search] = useState("")
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchdata = (name) => {
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
            .then(res => res.json())
            .then(data => {
                setPokemon(data)
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchdata("pikachu")
    }, [])

    const handlesearch = () =>{
        if(tsearch.trim() !== "")
        {
            fetchdata(tsearch)
        }
    }

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Enter Pokemon name..." 
                    value={tsearch}
                    onChange={(e) => search(e.target.value)}
                />
                <button onClick={handlesearch}>Search</button>
            </div>

            {loading ? (
                <p>Pokidex Loading...</p>
            ) : (
                pokemon && (
                    <div>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>Height : {pokemon.height}</p>
                    </div>
                )
            )}
        </div>
    )
}

export default poke
