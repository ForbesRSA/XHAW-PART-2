import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Card, Title, Section, Button, IconBox } from '../components';
import { PACKAGES, formatRand } from '../data';

export default function PackagesScreen({ navigation }) {
  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 18 }}>
      <Title>Our Packages</Title>
      <Text style={{ color: colors.muted }}>All prices exclude VAT (15%).</Text>
      <Section>Gaming Packages</Section>
      {PACKAGES.filter(p => p.type === 'gaming').map(p => (
        <Card key={p.id}><View style={s.row}><IconBox icon={p.icon} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.name}>{p.name}</Text><Text style={{ color: colors.muted }}>{p.short}</Text>
            <View style={[s.row, { justifyContent: 'space-between', marginTop: 8 }]}>
              <Text style={s.price}>{formatRand(p.price)}</Text>
              <Button small variant="outline" title="View Details" onPress={() => navigation.navigate('PackageDetail', { id: p.id })} />
            </View></View></View></Card>
      ))}
      <Section color={colors.purple}>Individual Experiences</Section>
      {PACKAGES.filter(p => p.type === 'individual').map(p => (
        <Card key={p.id} purple><View style={[s.row, { justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}><Text style={s.name}>{p.name}</Text><Text style={{ color: colors.muted }}>{p.short}</Text></View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <Text style={[s.price, { color: colors.purple }]}>{formatRand(p.price)}</Text>
            <Button small variant="purple" title="Quick Book" onPress={() => navigation.navigate('Calculator', { add: p.id })} />
          </View></View></Card>
      ))}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.white, fontWeight: '800', fontSize: 16 },
  price: { color: colors.blue, fontWeight: '900', fontSize: 16 }
});
