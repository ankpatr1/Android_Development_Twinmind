import React from 'react';
import { Linking, Pressable, StyleSheet, ViewStyle } from 'react-native';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function ExternalLink({ href, children, style }: ExternalLinkProps) {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    } else {
      console.warn("Don't know how to open URI: " + href);
    }
  };

  return (
    <Pressable onPress={handlePress} style={style}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
});
