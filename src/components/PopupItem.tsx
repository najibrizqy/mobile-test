import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';
import styles from './styles';

interface PopupItemProps {
    visible: boolean;
    content: string;
    onClose: () => void;
}

const PopupItem: React.FC<PopupItemProps> = ({
    visible,
    content,
    onClose,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{content}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.modalButton}
                        onPress={onClose}
                    >
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default PopupItem;
