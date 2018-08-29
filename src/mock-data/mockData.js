const nowPlayingResultsArray = {
  results: [
    {
      vote_count: 507,
      id: 345940,
      video: false,
      vote_average: 6.2,
      title: "The Meg",
      popularity: 173.315,
      poster_path: "/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg",
      original_language: "en",
      original_title: "The Meg",
      genre_ids: [28, 878, 53, 27],
      backdrop_path: "/ibKeXahq4JD63z6uWQphqoJLvNw.jpg",
      adult: false,
      overview:
        "A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.",
      release_date: "2018-08-09"
    },
    {
      vote_count: 1095,
      id: 353081,
      video: false,
      vote_average: 7.4,
      title: "Mission: Impossible - Fallout",
      popularity: 138.478,
      poster_path: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
      original_language: "en",
      original_title: "Mission: Impossible - Fallout",
      genre_ids: [12, 28, 53],
      backdrop_path: "/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg",
      adult: false,
      overview:
        "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
      release_date: "2018-07-25"
    },
    {
      vote_count: 2833,
      id: 351286,
      video: false,
      vote_average: 6.6,
      title: "Jurassic World: Fallen Kingdom",
      popularity: 102.979,
      poster_path: "/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
      original_language: "en",
      original_title: "Jurassic World: Fallen Kingdom",
      genre_ids: [28, 12, 878],
      backdrop_path: "/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg",
      adult: false,
      overview:
        "Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
      release_date: "2018-06-06"
    }
  ]
};

export const modifiedNowPlaying = [
  {
    id: 345940,
    title: "The Meg",
    releaseDates: "2018-08-09",
    overview:
      "A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.",
    poster_path: "/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg"
  },
  {
    id: 353081,
    title: "Mission: Impossible - Fallout",
    img: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    overview:
      "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
    releaseDates: "2018-07-25"
  },
  {
    id: 351286,
    title: "Jurassic World: Fallen Kingdom",
    img: "http://image.tmdb.org/t/p/original/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
    realeaseDates: "2018-06-06",
    overview:
      "Several years after the demise of Jurassic World, …event the extinction of the dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again."
  }
];
