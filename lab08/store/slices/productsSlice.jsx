import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
    {
        id: 1,
        name: 'iPhone 14 Pro',
        description: 'Найновіший iPhone з ProRAW камерою',
        price: 35999,
        image: 'https://yabloki.ua/media/cache/sylius_shop_product_original/6c/2f/iphone-14-pro-max-256-space-black_201302d8-d3d7-4eaa-a703-3a9c4968c6bb-1.png.webp',
    },
    {
        id: 2,
        name: 'Samsung Galaxy S23',
        description: 'Потужний Android смартфон',
        price: 28999,
        image: 'https://cdn.new-brz.net/app/public/models/SM-S916BZKDSEK/large/w/231009140026582955.webp',
    },
    {
        id: 3,
        name: 'MacBook Air M2',
        description: 'Ультратонкий ноутбук від Apple',
        price: 45999,
        image: 'https://yabloki.ua/media/cache/sylius_shop_product_original/0b/1b/macbook-air-13-apple-m2-256gb-midnight-2022-mly33-1.png.webp',
    },
    {
        id: 4,
        name: 'AirPods Pro',
        description: 'Бездротові навушники з шумозаглушенням',
        price: 8999,
        image: 'https://my-apple.com.ua/image/catalog/products/airpods/airpods-pro/airpods-pro-1.png',
    },
    {
        id: 5,
        name: 'iPad Pro 12.9"',
        description: 'Професійний планшет для роботи',
        price: 38999,
        image: 'https://grokholsky.com/uploads/products/590-590/66c887ca9500b-2024-08-23-03-59-54.webp',
    },
];

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: initialProducts,
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = productsSlice.actions;
export default productsSlice.reducer;
