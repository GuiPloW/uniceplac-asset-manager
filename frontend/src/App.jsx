import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Monitor, Cpu, Keyboard, Plus, Trash2, Download, Tag, Search, AlertCircle } from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:3000/equipamentos';

function App() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [form, setForm] = useState({ nome: '', tipo: 'Monitor', dataAquisicao: '', status: 'Ativo' });
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  useEffect(() => { fetchEquipamentos(); }, []);

  const fetchEquipamentos = async () => {
    try {
      const res = await axios.get(API_URL);
      setEquipamentos(res.data);
    } catch (error) {
      console.error("Erro ao carregar dados da API");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(form.dataAquisicao) > new Date()) {
      alert("A data de aquisição não pode ser uma data futura.");
      return;
    }

    try {
      await axios.post(API_URL, form);
      setForm({ nome: '', tipo: 'Monitor', dataAquisicao: '', status: 'Ativo' });
      fetchEquipamentos();
    } catch (error) {
      alert("Erro ao cadastrar equipamento.");
    }
  };

  const deleteEquipamento = async (id) => {
    if (window.confirm("Deseja realmente eliminar este ativo?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchEquipamentos();
    }
  };

  const equipamentosFiltrados = equipamentos.filter(eq => {
    return eq.nome.toLowerCase().includes(busca.toLowerCase()) &&
           (filtroTipo === '' || eq.tipo === filtroTipo) &&
           (filtroStatus === '' || eq.status === filtroStatus);
  });

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'Monitor': return <Monitor size={20} />;
      case 'CPU': return <Cpu size={20} />;
      case 'Teclado': return <Keyboard size={20} />;
      default: return <Tag size={20} />;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Teste Técnico: Desenvolvedor Full-Stack</h1>
        <p>Startup UNICEPLAC</p>
      </header>
      
      <section className="form-section">
        <form className="asset-form" onSubmit={handleSubmit}>
          <input 
            className="input-name" 
            placeholder="Nome do Equipamento" 
            value={form.nome} 
            onChange={e => setForm({...form, nome: e.target.value})} 
            required 
          />
          <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
            <option value="Monitor">Monitor</option>
            <option value="CPU">CPU</option>
            <option value="Teclado">Teclado</option>
          </select>
          <input 
            type="date" 
            value={form.dataAquisicao} 
            onChange={e => setForm({...form, dataAquisicao: e.target.value})} 
            required 
          />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="Ativo">Ativo</option>
            <option value="Manutencao">Manutenção</option>
          </select>
          <button type="submit" className="btn-submit">
            <Plus size={18} /> Cadastrar
          </button>
        </form>
      </section>

      <section className="dashboard-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            placeholder="Procurar por nome..." 
            value={busca} 
            onChange={e => setBusca(e.target.value)} 
          />
        </div>
        <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
          <option value="">Todos os Tipos</option>
          <option value="Monitor">Monitores</option>
          <option value="CPU">CPUs</option>
          <option value="Teclado">Teclados</option>
        </select>
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os Estados</option>
          <option value="Ativo">Ativos</option>
          <option value="Manutencao">Em Manutenção</option>
        </select>
      </section>

      <main className="grid-assets">
        {equipamentosFiltrados.length > 0 ? (
          equipamentosFiltrados.map(eq => (
            <article key={eq.id} className="asset-card">
              <button className="btn-delete" onClick={() => deleteEquipamento(eq.id)}>
                <Trash2 size={20} />
              </button>
              
              <div className="card-header-id">
                <span className="badge-id">ID: {eq.id.substring(0, 8)}</span>
              </div>

              <div className="card-main-info">
                <div className="icon-wrapper">{getIcon(eq.tipo)}</div>
                <h3>{eq.nome}</h3>
              </div>

              <p className="card-detail">Tipo: <strong>{eq.tipo}</strong></p>
              <p className="card-detail">
                Estado: <span className={`status-badge ${eq.status === 'Ativo' ? 'status-ativo' : 'status-manutencao'}`}>
                  {eq.status}
                </span>
              </p>
              
              <div className="card-footer-date">
                📅 Adquirido: {new Date(eq.dataAquisicao).toLocaleDateString('pt-BR')}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <AlertCircle size={48} className="empty-icon" />
            <h3>Nenhum equipamento encontrado</h3>
            <p>Tente ajustar os filtros ou a busca por nome.</p>
          </div>
        )}
      </main>

      <footer className="footer-export">
        <a href="http://localhost:3000/exportar" className="btn-export">
          <Download size={20} /> Exportar Inventário JSON
        </a>
      </footer>
    </div>
  );
}

export default App;

// Ele gerencia o estado e o ciclo de vida.