import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    RefreshControl
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { postsService } from '../services/posts';

export const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const result = await postsService.getPosts();
            if (result.success) {
                setPosts(result.data);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadPosts();
        setRefreshing(false);
    };

    const handleDeletePost = async (postId) => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await postsService.deletePost(postId);
                        if (result.success) {
                            setPosts(posts.filter(post => post.id !== postId));
                        } else {
                            Alert.alert('Error', result.error);
                        }
                    }
                }
            ]
        );
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    onPress: async () => {
                        await logout();
                    }
                }
            ]
        );
    };

    const renderPost = ({ item }) => (
        <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.postDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <View style={styles.postActions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate('CreatePost', { post: item })}
                >
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeletePost(item.id)}
                >
                    <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Posts</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {isLoading ? 'Loading...' : 'No posts yet. Create your first post!'}
                    </Text>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreatePost')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    listContainer: {
        padding: 20
    },
    postCard: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333'
    },
    postContent: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20
    },
    postDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10
    },
    editButton: {
        backgroundColor: '#007AFF'
    },
    deleteButton: {
        backgroundColor: '#ff4444'
    },
    actionButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 50
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    fabText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
