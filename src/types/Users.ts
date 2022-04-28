export interface User {
    id: number | null | undefined | string
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
    comment?: string
}

interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: string
        lng: string
    }
}