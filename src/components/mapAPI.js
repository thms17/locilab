function initializeMap() {
  const mapDiv = document.getElementById('map')
  if (!mapDiv) {
    return
  }

  // Initialisiere die Karte
  const map = L.map('map').setView([49.5, 7.5], 10)

  // OpenStreetMap-Layer hinzufügen
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map)

  // Standardwert in das Input-Feld setzen
  const inputField = document.getElementById('flurstueck-input')
  if (inputField) {
    inputField.value = '072422001003130036__' // Beispielwert
  }

  function ladeFlurstueck(flurstueckNummer) {
    const url = `https://www.geoportal.rlp.de/spatial-objects/519/collections/ave:Flurstueck/items?flstkennz=${encodeURIComponent(
      flurstueckNummer
    )}&f=json`

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API-Fehler: ${response.status}`)
        }
        const data = await response.json()
        return data
      })
      .then((data) => {
        if (data.features && data.features.length > 0) {
          // Alte Layer entfernen
          map.eachLayer((layer) => {
            if (layer instanceof L.GeoJSON) {
              map.removeLayer(layer)
            }
          })

          // GeoJSON-Daten hinzufügen
          const geoJsonLayer = L.geoJSON(data.features, {
            onEachFeature: function (feature, layer) {
              const props = feature.properties
              layer.bindPopup(
                `<b>Flurstück:</b> ${props.flstkennz || 'Unbekannt'}<br>
                 <b>Adresse:</b> ${props.lagebeztxt || 'Keine'}<br>
                 <b>Nutzung:</b> ${props.tntxt || 'Keine'}<br>
                 <b>Fläche:</b> ${props.flaeche || 'Unbekannt'} m²`
              )
            },
          }).addTo(map)

          // Karte auf das Flurstück zentrieren
          const bounds = geoJsonLayer.getBounds()
          map.fitBounds(bounds)

          // Adressen der Flurstücke im Debug-Bereich anzeigen
          const resultsElement = document.querySelector('[results]')
          if (resultsElement) {
            const addresses = data.features
              .map((feature) => feature.properties.lagebeztxt || 'Keine Adresse verfügbar')
              .join('<br>')
            resultsElement.innerHTML = `<b>Gefundene Adressen:</b><br>${addresses}`
          }
        } else {
          alert('Flurstück nicht gefunden.')
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error)
      })
  }

  // Event-Listener für den Such-Button
  const suchenButton = document.getElementById('suchen-button')
  if (!suchenButton) {
    console.error('Der Button mit der ID "suchen-button" wurde nicht gefunden.')
    return
  }

  suchenButton.addEventListener('click', () => {
    const input = document.getElementById('flurstueck-input')
    if (!input) {
      console.error('Das Eingabefeld mit der ID "flurstueck-input" wurde nicht gefunden.')
      return
    }

    const flurstueckNummer = input.value
    if (flurstueckNummer) {
      ladeFlurstueck(flurstueckNummer)
    } else {
      alert('Bitte eine Flurstücksnummer eingeben.')
    }
  })
}

initializeMap()
