EnumerableSet.AddressSet private orgaosAtivosSet;

// Adicionar um endereço
orgaosAtivosSet.add(0x123...);

// Remover um endereço
orgaosAtivosSet.remove(0x123...);

// Verificar se existe
bool existe = orgaosAtivosSet.contains(0x123...);

// Quantidade de elementos
uint tamanho = orgaosAtivosSet.length();

// Pegar elemento por índice (útil para iterar)
address orgao = orgaosAtivosSet.at(0);

// Pegar todos os elementos como array
address[] memory todos = orgaosAtivosSet.values();
