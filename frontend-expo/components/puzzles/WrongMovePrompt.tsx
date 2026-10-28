import GlassBlurView from '@/components/GlassBlurView';
import GlobalStyle from '@/context/GlobalStyle';
import { useTheme } from '@/context/ThemeContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WrongMovePromptProps {
    visible: boolean;
    onTryAgain: () => void;
    isTablet: boolean;
}

export default function WrongMovePrompt({ visible, onTryAgain, isTablet }: WrongMovePromptProps) {
    const { theme } = useTheme();
    const textStyles = GlobalStyle(theme, isTablet);
    const accentColor = theme.dark ? '#FF8A8A' : '#B42318';

    if (!visible) {
        return null;
    }

    return (
        <View
            accessibilityLiveRegion="assertive"
            accessibilityRole="alert"
            style={[
                styles.container,
                {
                    borderColor: accentColor,
                    borderRadius: isTablet ? 24 : 18,
                    bottom: isTablet ? 28 : 14,
                    left: isTablet ? 28 : 14,
                    padding: isTablet ? 18 : 12,
                    right: isTablet ? 28 : 14,
                },
            ]}
        >
            <GlassBlurView
                theme={theme}
                isTablet={isTablet}
                color={theme.primaryButton}
                borderRadius={isTablet ? 22 : 16}
            />

            <View style={[styles.alertMark, { backgroundColor: accentColor }]}>
                <Text style={[styles.alertMarkText, { color: theme.background }]}>!</Text>
            </View>

            <View style={styles.message}>
                <Text style={[textStyles.h5, { color: theme.primaryText }]}>Not quite</Text>
                <Text
                    numberOfLines={2}
                    style={[textStyles.h6, styles.description, { color: `${theme.primaryText}B8` }]}
                >
                    That move isn&apos;t part of this puzzle.
                </Text>
            </View>

            <TouchableOpacity
                accessibilityHint="Restores the last valid board position"
                accessibilityLabel="Try the puzzle move again"
                accessibilityRole="button"
                onPress={onTryAgain}
                style={[
                    styles.retryButton,
                    {
                        backgroundColor: theme.secondaryButton,
                        borderRadius: isTablet ? 18 : 14,
                        paddingHorizontal: isTablet ? 22 : 14,
                        paddingVertical: isTablet ? 12 : 9,
                    },
                ]}
            >
                <Text style={[textStyles.h6, { color: theme.secondaryText, fontWeight: '800' }]}>Try Again</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderWidth: 2,
        boxShadow: '0 8px 24px #00000045',
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        zIndex: 50,
    },
    alertMark: {
        alignItems: 'center',
        borderRadius: 18,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    alertMarkText: {
        fontFamily: 'Nunito',
        fontSize: 23,
        fontWeight: '900',
        lineHeight: 27,
    },
    message: {
        flex: 1,
        minWidth: 0,
    },
    description: {
        marginTop: 1,
    },
    retryButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
