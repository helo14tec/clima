import { useState } from "react";
import "./App.css";
import {
  CloudSunRain,
  MapPinned,
  Thermometer,
  Droplet,
  Wind,
} from "lucide-react";
function App() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  //Função para buscar dados do clima
  const buscaClima = async () => {
    //validação básica
    if (!cidade.trim()) {
      setErro("❕ Por favor, digite uma cidade");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const API_KEY = "50878f4678cd0841144b44b2fca0ccc0";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error("❕ Cidade não encontrada");
      }

      const dados = await resposta.json();
      setClima(dados);
    } catch (error) {
      setErro(error.message);
      setClima(null);
    } finally {
      setCarregando(false);
    }
  }; //fecha buscaClima()

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      buscaClima();
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="content-wrapper">
          <header>
            <h1>
              <CloudSunRain color="#ba9ac9" size={48} />
              Consulta de Clima
            </h1>
            <p>Exemplo de consumo de API com React</p>
          </header>

          <div className="busca-box">
            <div className="busca-container">
              <input
                type="text"
                placeholder="Digite o nome da cidade.."
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={buscaClima} disabled={carregando}>
                {carregando ? "Buscando..." : "Buscar"}
              </button>
            </div>
            {erro && <div className="erro-message">{erro}</div>}
          </div>

          {clima && (<>

          <div id="card-resultado">
            <div id="cidade-info">
              <div id="cidade-nome">
                <MapPinned style={{ color: "#c499c2" }} size={48} />
                {clima.name}, {clima.sys.country}
              </div>
              <p id="cidade-desc">
                {clima.weather[0].description}
              </p>
            </div>
            {}
            <div id="temperatura-box">
              <div id="temperatura-valor">{Math.round(clima.main.temp)}ºC</div>
              <div id="sensacao">sensação de {Math.round(clima.main.feels_like)}ºC</div>
            </div>

            <div className="detalhes-box">
              <div className="detalhes-itens">
                <Thermometer />
                <h2>Min/Max</h2>
                <h3>{Math.round(clima.main.temp.min)}ºC / 
                    {Math.round(clima.main.temp.max)}ºC
                    </h3>
              </div>

              <div className="detalhes-itens">
                <Droplet />
                <h2>umidade</h2>
                <h3>{clima.main.humidity}%</h3>
              </div>

              <div className="detalhes-itens">
                <Wind />
                <h2>vento</h2>
                <h3>{Math.round(clima.wind.speed * 3.6)}km/h</h3>
              </div>
            </div>
            {}
          </div>
          </>)}
        </div>
      </div>
    </>
  );
}

export default App;
