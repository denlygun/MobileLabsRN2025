import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartScreen = ({ navigation }) => {
    const { items, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemoveItem = (id, name) => {
        Alert.alert(
            'Видалити товар',
            `Видалити ${name} з кошика?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Видалити', onPress: () => dispatch(removeFromCart(id)) },
            ]
        );
    };

    const handleQuantityChange = (id, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            Alert.alert('Кошик порожній', 'Додайте товари до кошика');
            return;
        }
        navigation.navigate('Checkout');
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} ₴</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.quantity, -1)}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.quantity, 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>
                    Всього: {(item.price * item.quantity).toLocaleString()} ₴
                </Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id, item.name)}
            >
                <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
        </View>
    );

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Кошик порожній</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>
                    Загальна сума: {totalAmount.toLocaleString()} ₴
                </Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    list: {
        padding: 16,
    },
    cartItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#2196F3',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        marginHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    removeButton: {
        backgroundColor: '#f44336',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 8,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CartScreen;