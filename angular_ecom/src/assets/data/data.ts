export let Categories = [
    {category: 'mens', cover: '../../assets/images/home_slider/mens.jpg'},
    {category: 'women', cover: '../../assets/images/home_slider/women.jpg"'},
    {category: 'weightlifting', cover: '../../assets/images/home_slider/weightlifting.jpg"'},
    {category: 'running', cover: '../../assets/images/home_slider/running.jpg"'},

]

export interface Product {
    products_id: number,
    category_id_ref: string,
    products_name: string,
    products_price: number,
    products_desc: string,
    products_cover: string
  }
export interface CartItem {
    product: Product,
    amount: number
}
export const products = [
    {
        id: 1,
        category: 'men',
        name: 'Shorts',
        price: 25,
        desc: "lightweight shorts",
        cover: '../assets/images/home_slider/mens4.jpg'

    },
    {
        id: 2,
        category: 'men',
        name: 'Shirt',
        price: 25,
        desc: "dry fit technology",
        cover: '../assets/images/home_slider/mens3.jpg'
    } ,   {
        id: 3,
        category: 'men',
        name: 'Hoodie',
        price: 25,
        desc: "grey/zip up",
        cover: '../assets/images/home_slider/mens8.jpg'

    },
    {
        id: 4,
        category: 'men',
        name: 'Tank top',
        price: 25,
        desc: "red/gym wear",
        cover: '../assets/images/home_slider/mens5.jpg'

    },
    {
        id: 5,
        category: 'men',
        name: 'Shirt',
        price: 25,
        desc: "active wear/graphic",
        cover: '../assets/images/home_slider/mens7.jpg'
    } ,   {
        id: 6,
        category: 'men',
        name: 'Shorts',
        price: 25,
        desc: "black/running",
        cover: '../assets/images/home_slider/mens6.jpg'

    },
    /*Women*/
    {
        id: 1,
        category: 'women',
        name: 'Blue Leggings',
        price: 25,
        desc: "seamless leggings",
        cover: '../assets/images/home_slider/women4.jpg'
    },
    {
        id: 2,
        category: 'women',
        name: 'Sports bra',
        price: 25,
        desc: "blue/seamless",
        cover: '../assets/images/home_slider/women4.jpg'

    } ,   {
        id: 3,
        category: 'women',
        name: 'Shoes',
        price: 25,
        desc: "impact absorbing foam insole",
        cover: '../assets/images/home_slider/women4.jpg'

    },
    {
        id: 4,
        category: 'women',
        name: 'Blue Leggings',
        price: 25,
        desc: "seamless leggings",
        cover: '../assets/images/home_slider/women4.jpg'
    },
    {
        id: 5,
        category: 'women',
        name: 'Sports bra',
        price: 25,
        desc: "blue/seamless",
        cover: '../assets/images/home_slider/women4.jpg'

    } ,   {
        id: 6,
        category: 'women',
        name: 'Shoes',
        price: 25,
        desc: "impact absorbing foam insole",
        cover: '../assets/images/home_slider/women4.jpg'

    }
]