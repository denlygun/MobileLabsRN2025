import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { postsService } from '../services/posts';

export const CreatePostScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isEditing = route.params?.post;
    const post = route.params?.post;

    useEffect(() => {
        if (isEditing) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [isEditing, post]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const result = isEditing
                ? await postsService.updatePost(post.id, title.trim(), content.trim())
                : await postsService.createPost(title.trim(), content.trim());

            if (result.success) {
                Alert.alert(
                    'Success',
                    `Post ${isEditing ? 'updated' : 'created'} successfully!`,
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isEditing ? 'Edit Post' : 'Create Post'}
                </Text>
                <TouchableOpacity
                    style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.saveButtonText}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Enter post title"
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                />

                <Text style={styles.label}>Content</Text>
                <TextInput
                    style={styles.contentInput}
                    placeholder="Enter post content"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                    maxLength={1000}
                />
            </View>
        </KeyboardAvoidingView>
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
    cancelButton: {
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    cancelButtonText: {
        color: '#007AFF',
        fontSize: 16
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5
    },
    saveButtonDisabled: {
        backgroundColor: '#ccc'
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    form: {
        flex: 1,
        padding: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333'
    },
    titleInput: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    contentInput: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        height: 200,
        borderWidth: 1,
        borderColor: '#ddd'
    }
});