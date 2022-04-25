import React from "react"

const { 
    Provider: FavoriteProvider, 
    Consumer: FavoriteConsumer } = React.createContext();

export { FavoriteProvider, FavoriteConsumer };