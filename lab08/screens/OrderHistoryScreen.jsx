import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearOrders } from '../store/slices/ordersSlice';

const OrderHistoryScreen = () => {
    const { orders } = useSelector(state => state.orders);
    const dispatch = useDispatch();

    const handleClearHistory = () => {
        Alert.alert(
            'Очистити історію',
            'Ви впевнені, що хочете видалити всю історію замовлень?',
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Видалити', onPress: () => dispatch(clearOrders()) },
            ]
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Замовлення №{item.id}</Text>
                <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.orderInfo}>
                    Товарів: {item.itemsCount} шт.
                </Text>
                <Text style={styles.orderTotal}>
                    Сума: {item.totalAmount.toLocaleString()} ₴
                </Text>
            </View>
            <View style={styles.customerInfo}>
                <Text style={styles.customerText}>
                    Клієнт: {item.customerName}
                </Text>
                <Text style={styles.customerText}>
                    Email: {item.customerEmail}
                </Text>
            </View>
        </View>
    );

    if (orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Історія замовлень порожня</Text>
                <Text style={styles.emptySubtext}>
                    Оформіть перше замовлення, щоб побачити його тут
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Історія замовлень</Text>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
                    <Text style={styles.clearButtonText}>Очистити</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={orders}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    list: {
        padding: 16,
    },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderInfo: {
        fontSize: 14,
        color: '#666',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    customerInfo: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 12,
    },
    customerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
});

export default OrderHistoryScreen;
