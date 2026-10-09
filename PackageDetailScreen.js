import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Button, Section } from '../components';
import { PACKAGES, formatRand } from '../data';

export default function PackageDetailScreen({ route, navigation }) {
  const p = PACKAGES.find(x => x.id === route.params?.id) || PACKAGES[0];
  return (
    <ScrollView style={s.root} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={s.art}><Text style={{ fontSize: 90 }}>{p.icon}</Text></View>
      <View style={{ padding: 18 }}>
        <Text style={s.h1}>{p.name}</Text>
        <View style={s.row}>
          <Text style={s.price}>{formatRand(p.price)}</Text>
          {p.badge && <Text style={s.badge}>{p.badge}</Text>}
          <Text style={{ color: colors.muted, marginLeft: 8 }}>excl. VAT</Text>
        </View>
        <Text style={s.desc}>{p.desc}</Text>
        <Section>What's Included</Section>
        {p.includes.map(i => (
          <View key={i} style={[s.row, { marginBottom: 10 }]}>
            <Ionicons name="checkmark-circle" size={22} color={colors.blue} />
            <Text style={{ color: colors.white, marginLeft: 10, flex: 1 }}>{i}</Text>
          </View>
        ))}
        <Button title="Book Now" onPress={() => navigation.navigate('Calculator', { add: p.id })} style={{ marginTop: 18 }} />
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  art: { height: 200, backgroundColor: '#14262A', alignItems: 'center', justifyContent: 'center' },
  h1: { color: colors.white, fontSize: 26, fontWeight: '900' },
  row: { flexDirection: 'row', alignItems: 'center' },
  price: { color: colors.blue, fontSize: 28, fontWeight: '900', marginVertical: 6 },
  badge: { color: colors.blue, backgroundColor: '#0B3A3D', fontSize: 11, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 10, overflow: 'hidden' },
  desc: { color: colors.muted, lineHeight: 22, marginTop: 6 }
});
