// App.js — SkillSwap MVP prototype (Expo + React Native)
import React, {useState} from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const dummyOffers = [
  { id: '1', title: 'Python Tutoring', user: 'Ali', duration: 60 },
  { id: '2', title: 'Guitar Lessons', user: 'Fatima', duration: 45 },
  { id: '3', title: 'Drawing Basics', user: 'Ahmed', duration: 90 },
];

export default function App(){
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [offers, setOffers] = useState(dummyOffers);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  function handleLogin(){
    setUser({name: 'Test Student', email});
  }

  function handlePost(){
    const newOffer = { id: Date.now().toString(), title, user: user?.name || 'You', duration: 60 };
    setOffers([newOffer, ...offers]);
    setTitle('');
    setShowCreate(false);
  }

  function openBooking(offer){
    setSelectedOffer(offer);
    setBookingModalVisible(true);
  }

  function confirmBooking(){
    alert('Booked ' + selectedOffer.title + ' with ' + selectedOffer.user);
    setBookingModalVisible(false);
  }

  if(!user){
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>SkillSwap — Login</Text>
        <TextInput placeholder="email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
        <Button title="Login (dummy)" onPress={handleLogin} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={styles.h1}>Home</Text>
        <Button title="Create" onPress={() => setShowCreate(true)} />
      </View>

      <FlatList
        data={offers}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>By {item.user} • {item.duration} mins</Text>
            <View style={{flexDirection:'row', marginTop:8}}>
              <Button title="Book" onPress={() => openBooking(item)} />
            </View>
          </View>
        )}
      />

      <Modal visible={showCreate} animationType="slide">
        <SafeAreaView style={styles.container}>
          <Text style={styles.h1}>Create Offer</Text>
          <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
          <Button title="Post" onPress={handlePost} />
          <Button title="Cancel" onPress={() => setShowCreate(false)} />
        </SafeAreaView>
      </Modal>

      <Modal visible={bookingModalVisible} animationType="fade" transparent={false}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.h1}>Confirm Booking</Text>
          {selectedOffer && (
            <>
              <Text style={{fontSize:18}}>{selectedOffer.title}</Text>
              <Text>With: {selectedOffer.user}</Text>
              <View style={{height:20}} />
              <Button title="Confirm" onPress={confirmBooking} />
              <Button title="Cancel" onPress={() => setBookingModalVisible(false)} />
            </>
          )}
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  h1:{fontSize:24,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ccc',padding:8,marginBottom:12,borderRadius:6},
  card:{padding:12,borderWidth:1,borderColor:'#ddd',borderRadius:8,marginBottom:10},
  title:{fontSize:18,fontWeight:'600'},
  meta:{color:'#555',marginTop:4}
});
