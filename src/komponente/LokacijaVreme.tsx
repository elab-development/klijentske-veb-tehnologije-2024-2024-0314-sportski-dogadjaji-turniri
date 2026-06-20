import React, { useState, useEffect } from 'react';

interface LokacijaVremeProps {
    lokacija: string;
}

interface VremenskiPodaci {
    temp: number;
    brzinaVetra: number;
    opis: string;
}

const weatherCodes: { [key: number]: string } = {
    0: 'Vedro ☀️', 1: 'Pretežno vedro 🌤️', 2: 'Delimično oblačno ⛅', 3: 'Oblačno ☁️',
    45: 'Magla 🌫️', 48: 'Magla 🌫️', 51: 'Slaba kiša 🌧️', 53: 'Umerena kiša 🌧️',
    55: 'Jaka kiša 🌧️', 61: 'Slaba kiša 🌧️', 63: 'Umerena kiša ☔', 65: 'Jaka kiša ☔',
    71: 'Sneg 🌨️', 73: 'Sneg 🌨️', 75: 'Sneg ❄️', 80: 'Pljuskovi 🌦️',
    81: 'Pljuskovi 🌦️', 82: 'Jaki pljuskovi ⛈️', 95: 'Grmljavina ⚡'
};

export const LokacijaVreme: React.FC<LokacijaVremeProps> = ({ lokacija }) => {
    const [vreme, setVreme] = useState<VremenskiPodaci | null>(null);
    const [ucitavanje, setUcitavanje] = useState<boolean>(true);
    const [greska, setGreska] = useState<string | null>(null);
    const [koordinate, setKoordinate] = useState<{ lat: number; lon: number } | null>(null);

    useEffect(() => {
        let aktivno = true;
        const ucitaj = async () => {
            setUcitavanje(true);
            setGreska(null);
            try {
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(lokacija)}&format=json&limit=1`);
                const geoData = await geoRes.json();
                const lat = geoData[0] ? parseFloat(geoData[0].lat) : 44.787197;
                const lon = geoData[0] ? parseFloat(geoData[0].lon) : 20.4489216;

                if (aktivno) setKoordinate({ lat, lon });

                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                if (!weatherRes.ok) throw new Error("Greška pri učitavanju vremena");
                const weatherData = await weatherRes.json();

                if (aktivno) {
                    const temp = Math.round(weatherData.current_weather.temperature);
                    const brzinaVetra = Math.round(weatherData.current_weather.windspeed);
                    const opis = weatherCodes[weatherData.current_weather.weathercode] || 'Promenljivo 🌤️';
                    setVreme({ temp, brzinaVetra, opis });
                }
            } catch (err) {
                if (aktivno) {
                    setGreska(err instanceof Error ? err.message : "Greška");
                }
            } finally {
                if (aktivno) setUcitavanje(false);
            }
        };
        ucitaj();
        return () => { aktivno = false; };
    }, [lokacija]);

    const mapSrc = koordinate
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${koordinate.lon - 0.05}%2C${koordinate.lat - 0.03}%2C${koordinate.lon + 0.05}%2C${koordinate.lat + 0.03}&layer=mapnik&marker=${koordinate.lat}%2C${koordinate.lon}`
        : '';

    return (
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <div style={{ marginBottom: '14px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                    🌦️ Vremenske prilike
                </h4>
                {ucitavanje ? (
                    <div>Učitavanje...</div>
                ) : greska ? (
                    <div style={{ color: '#ef4444' }}>{greska}</div>
                ) : vreme ? (
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div><strong>{vreme.temp}°C</strong></div>
                        <div>Stanje: <strong>{vreme.opis}</strong></div>
                        <div>Vetar: <strong>{vreme.brzinaVetra} km/h</strong></div>
                    </div>
                ) : null}
            </div>

            <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                    📍 Lokacija
                </h4>
                <div style={{ width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {koordinate ? (
                        <iframe
                            title="Mapa"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            src={mapSrc}
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                            Učitavanje mape...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
