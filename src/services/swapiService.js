export default class SwapiService {
  apiBase = 'https://swapi.dev/api';

  // 1
  // получаем асинхронно дату (промис)
  getResource = async (url) => {
    // ждем пока результат промиса не станет доступен и запишем в переменную
    const res = await fetch(`${this.apiBase}${url}`);
    // если респонс не 200-299 и есть ошибка, кинуть сообщение
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    // достаем тело результата/ответа
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this.transformPerson);
  };
  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this.transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this.transformPlanet);
  };
  
  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this.transformPlanet(planet);
  };

  getAllStarShips = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this.transformStarship);
    // return res.results;
  };
  getStarShip = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this.transformStarship(starship);
  };

  
  getPersonImg = ({id}) => {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }
  getPlanetImg = ({id}) => {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  }
  getStarshipImg = ({id}) => {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }


  extractId = (item) => {
    // get id from the link using regExp
    const idRegEx = /\/([0-9]*)\/$/;
    return item.url.match(idRegEx)[1];
  }

  transformPlanet = (planet) => {
    return {
      id: this.extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }
  transformStarship = (starship) => {
    return {
      id: this.extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }
  transformPerson = (person) => {
    return {
      id: this.extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      skinColor: person.skin_color,
      mass: person.mass,
      height: person.height,
      hairColor: person.hair_color,
      films: person.films,
      created: person.created,
      edited: person.edited
    }
  }

  // // 2
  // getItem = () => {
  //   fetch('https://swapi.dev/api/people/1/')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((body) => {
  //       console.log(body);
  //     });
  // };
}
