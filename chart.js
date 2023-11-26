function renderStats(j){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [pokemons[j-1]["stats"]["0"]["stat"]["name"],pokemons[j-1]["stats"]["1"]["stat"]["name"],pokemons[j-1]["stats"]["2"]["stat"]["name"],
        pokemons[j-1]["stats"]["3"]["stat"]["name"],pokemons[j-1]["stats"]["4"]["stat"]["name"],pokemons[j-1]["stats"]["5"]["stat"]["name"]],
        datasets: [{
          label: 'Pokedex Base Stats',
          data: [ pokemons[j-1]["stats"]["0"]["base_stat"],pokemons[j-1]["stats"]["1"]["base_stat"],pokemons[j-1]["stats"]["2"]["base_stat"],
          pokemons[j-1]["stats"]["3"]["base_stat"],pokemons[j-1]["stats"]["4"]["base_stat"],pokemons[j-1]["stats"]["5"]["base_stat"]],
          borderWidth: 1,
          backgroundColor: [
            '#9CAD1A',
            '#76BDFE',
            '#FB6C6C',
            '#654DA4',
            '#8C682E',
            '#FFA500'
          ],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}