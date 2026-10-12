import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  usuario: any | null;
  carregando: boolean;
  carregarDadosUsuario: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarDadosUsuario() {
    try {
      console.log('A aceder a http://10.0.2.2:8080/api/v1/usuario/logado...');
      const resposta = await fetch('http://10.0.2.2:8080/api/v1/usuario/logado', {
        credentials: 'include',
      });
      
      console.log('Status da resposta do /usuario/logado:', resposta.status);
      
      if (resposta.ok) {
        const dados = await resposta.json();
        console.log('Utilizador logado obtido com sucesso:', dados);
        const dadosComCpf = {
          ...dados,
          cpf: dados.cpf || dados.pessoa?.cpfPessoa || '43243479568',
        };
        setUsuario(dadosComCpf);
      } else {
        console.warn('Sessão não encontrada via cookie.');
        setUsuario(null);
      }
    } catch (erro) {
      console.error('Erro de rede ou conexão ao buscar utilizador logado:', erro);
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, carregarDadosUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}