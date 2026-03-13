import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

// Tipos
interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  status: 'cheio' | 'vazio' | 'moderado';
  vibe: string;
  price: 'barato' | 'normal' | 'caro';
}

// Dados de exemplo (65 lugares do DF)
const PLACES: Place[] = [
  {
    id: '1',
    name: 'Lago Paranoá',
    latitude: -15.7942,
    longitude: -47.8822,
    category: 'Parque',
    rating: 4.8,
    status: 'moderado',
    vibe: 'Romântico',
    price: 'barato',
  },
  {
    id: '2',
    name: 'Pontão do Lago Sul',
    latitude: -15.8267,
    longitude: -47.8822,
    category: 'Restaurante',
    rating: 4.6,
    status: 'cheio',
    vibe: 'Sofisticado',
    price: 'caro',
  },
  {
    id: '3',
    name: 'Museu Nacional',
    latitude: -15.7975,
    longitude: -47.8603,
    category: 'Museu',
    rating: 4.5,
    status: 'vazio',
    vibe: 'Cultural',
    price: 'barato',
  },
  // Adicione mais 62 lugares aqui...
];

export default function App() {
  const [places, setPlaces] = useState<Place[]>(PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<'map' | 'list' | 'top'>('map');

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cheio':
        return '#FF6B35'; // Laranja
      case 'vazio':
        return '#00D084'; // Verde
      case 'moderado':
        return '#0066FF'; // Azul
      default:
        return '#999';
    }
  };

  // Função para obter emoji do status
  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'cheio':
        return '🔴';
      case 'vazio':
        return '🟢';
      case 'moderado':
        return '🟡';
      default:
        return '⚪';
    }
  };

  // Renderizar mapa
  const renderMap = () => (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7975,
          longitude: -47.8822,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => setSelectedPlace(place)}
            pinColor={getStatusColor(place.status)}
          >
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>{getStatusEmoji(place.status)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedPlace && (
        <View style={styles.placeCard}>
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
          <Text style={styles.placeCategory}>{selectedPlace.category}</Text>
          <View style={styles.placeInfo}>
            <Text style={styles.infoText}>⭐ {selectedPlace.rating}</Text>
            <Text style={styles.infoText}>{getStatusEmoji(selectedPlace.status)} {selectedPlace.status}</Text>
            <Text style={styles.infoText}>💰 {selectedPlace.price}</Text>
          </View>
          <Text style={styles.vibeText}>Vibe: {selectedPlace.vibe}</Text>
        </View>
      )}
    </View>
  );

  // Renderizar lista
  const renderList = () => (
    <ScrollView style={styles.listContainer}>
      {places.map((place) => (
        <TouchableOpacity
          key={place.id}
          style={styles.listItem}
          onPress={() => setSelectedPlace(place)}
        >
          <View style={styles.listItemContent}>
            <Text style={styles.listItemName}>{place.name}</Text>
            <Text style={styles.listItemCategory}>{place.category}</Text>
            <View style={styles.listItemStats}>
              <Text style={styles.stat}>⭐ {place.rating}</Text>
              <Text style={[styles.stat, { color: getStatusColor(place.status) }]}>
                {getStatusEmoji(place.status)} {place.status}
              </Text>
              <Text style={styles.stat}>💰 {place.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Renderizar Top 10
  const renderTop = () => {
    const topPlaces = [...places].sort((a, b) => b.rating - a.rating).slice(0, 10);
    return (
      <ScrollView style={styles.topContainer}>
        <Text style={styles.topTitle}>🏆 Top 10 Lugares</Text>
        {topPlaces.map((place, index) => (
          <TouchableOpacity
            key={place.id}
            style={styles.topItem}
            onPress={() => setSelectedPlace(place)}
          >
            <Text style={styles.topRank}>#{index + 1}</Text>
            <View style={styles.topItemContent}>
              <Text style={styles.topItemName}>{place.name}</Text>
              <Text style={styles.topItemCategory}>{place.category}</Text>
            </View>
            <Text style={styles.topRating}>⭐ {place.rating}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚀 DizzAí!</Text>
        <Text style={styles.subtitle}>Saiba como está o lugar AGORA</Text>
      </View>

      {currentTab === 'map' && renderMap()}
      {currentTab === 'list' && renderList()}
      {currentTab === 'top' && renderTop()}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === 'map' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('map')}
        >
          <Text style={styles.tabButtonText}>🗺️ Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === 'list' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('list')}
        >
          <Text style={styles.tabButtonText}>📋 Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, currentTab === 'top' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('top')}
        >
          <Text style={styles.tabButtonText}>🏆 Top 10</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    padding: 16,
    backgroundColor: '#1a1f3a',
    borderBottomWidth: 1,
    borderBottomColor: '#00D084',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00D084',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerLabel: {
    backgroundColor: '#1a1f3a',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#00D084',
  },
  markerText: {
    fontSize: 20,
  },
  placeCard: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#1a1f3a',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00D084',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  placeCategory: {
    fontSize: 14,
    color: '#00D084',
    marginBottom: 8,
  },
  placeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    color: '#999',
    fontSize: 12,
  },
  vibeText: {
    color: '#0066FF',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    padding: 12,
  },
  listItem: {
    backgroundColor: '#1a1f3a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00D084',
  },
  listItemContent: {},
  listItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  listItemCategory: {
    fontSize: 12,
    color: '#00D084',
    marginBottom: 8,
  },
  listItemStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
    color: '#999',
  },
  topContainer: {
    flex: 1,
    padding: 16,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D084',
    marginBottom: 16,
  },
  topItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1f3a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  topRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 12,
  },
  topItemContent: {
    flex: 1,
  },
  topItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  topItemCategory: {
    fontSize: 12,
    color: '#00D084',
  },
  topRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1f3a',
    borderTopWidth: 1,
    borderTopColor: '#00D084',
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  tabButtonActive: {
    borderTopColor: '#00D084',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
});
