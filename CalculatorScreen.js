import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Card, Title, Section, Button } from '../components';
import { PACKAGES, calculateQuote, formatRand } from '../data';

export default function CalculatorScreen({ route, navigation }) {
  const [qty, setQty] = useState(() => Object.fromEntries(PACKAGES.map(p => [p.id, 0])));
  useEffect(() => {
    const add = route.params?.add;
    if (add) setQty(q => ({ ...q, [add]: Math.max(1, q[add] || 0) }));
  }, [route.params?.add]);

  const change = (id, d) => setQty(q => ({ ...q, [id]: Math.max(0, Math.min(10, q[id] + d)) }));
  const items = useMemo(() => PACKAGES.filter(p => qty[p.id] > 0).map(p => ({ ...p, qty: qty[p.id] })), [qty]);
  const q = useMemo(() => calculateQuote(items), [items]);

  const proceed = () => {
    if (!items.length) { Alert.alert('Nothing selected', 'Please select at least one package or experience.'); return; }
    Alert.alert('Quotation', items.map(i => `${i.qty} x ${i.name}`).join('\n') + `\n\nTotal due: ${formatRand(q.total)}`,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Contact Us', onPress: () => navigation.navigate('Contact', { quote: true }) }]);
  };

  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 18 }}>
      <Title>Calculate Fees</Title>
      <Section>Select Your Packages</Section>
      {PACKAGES.map(p => (
        <Card key={p.id}><View style={s.row}>
          <Ionicons name={qty[p.id] > 0 ? 'checkbox' : 'square-outline'} size={26} color={qty[p.id] > 0 ? colors.blue : colors.muted} />
          <View style={{ flex: 1, marginLeft: 10 }}><Text style={s.name}>{p.name}</Text><Text style={{ color: colors.blue }}>{formatRand(p.price)}</Text></View>
          <TouchableOpacity style={s.circle} onPress={() => change(p.id, -1)} accessibilityLabel={`Decrease ${p.name}`}><Text style={s.sym}>-</Text></TouchableOpacity>
          <Text style={s.qty}>{qty[p.id]}</Text>
          <TouchableOpacity style={[s.circle, { backgroundColor: colors.blue }]} onPress={() => change(p.id, 1)} accessibilityLabel={`Increase ${p.name}`}><Text style={[s.sym, { color: '#000' }]}>+</Text></TouchableOpacity>
        </View></Card>
      ))}
      <Text style={{ color: colors.purple, fontWeight: '800', marginTop: 6, fontSize: 12 }}>DISCOUNT RATES</Text>
      <Card purple style={{ marginTop: 6 }}><Text style={{ color: colors.muted, textAlign: 'center' }}>1 booking: 0% | 2: 5% | 3: 10% | 4+: 15%</Text></Card>
      <Card>
        <Line label="Bookings selected" value={String(q.count)} />
        <Line label="Subtotal" value={formatRand(q.subtotal)} />
        <Line label={`Multi-Booking Discount (${Math.round(q.rate * 100)}%)`} value={`- ${formatRand(q.discount)}`} color={colors.green} />
        <Line label="VAT (15%)" value={formatRand(q.vat)} />
        <View style={s.hr} />
        <View style={s.row}><Text style={[s.name, { flex: 1 }]}>TOTAL DUE</Text><Text style={s.total}>{formatRand(q.total)}</Text></View>
      </Card>
      <Button title="Generate Quotation" onPress={proceed} />
    </ScrollView>
  );
}
const Line = ({ label, value, color }) => (
  <View style={[s.row, { paddingVertical: 5 }]}><Text style={{ flex: 1, color: color || colors.muted }}>{label}</Text><Text style={{ color: color || colors.white }}>{value}</Text></View>
);
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.white, fontWeight: '800', fontSize: 15 },
  circle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
  sym: { color: colors.white, fontSize: 20, fontWeight: '900' },
  qty: { color: colors.white, fontWeight: '800', minWidth: 28, textAlign: 'center' },
  hr: { height: 1, backgroundColor: '#333', marginVertical: 8 },
  total: { color: colors.blue, fontWeight: '900', fontSize: 22 }
});
