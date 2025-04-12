import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 600,
    },
    headerFlatlist: { marginTop: 20 },
    scrollContent: {
        padding: 20,
    },
});

export default styles;
