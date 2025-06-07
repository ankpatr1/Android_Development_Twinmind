import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export type Props = PropsWithChildren<{
  title: string;
}>;

export function Collapsible({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <ThemedView style={styles.stepContainer}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.header}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <IconSymbol name={open ? 'chevron.down' : 'chevron.right'} color="#000" />
      </TouchableOpacity>
      {open && children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
