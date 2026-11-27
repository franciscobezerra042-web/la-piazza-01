/* Dados transcritos do cardápio digital (livemenu.app) e da carta de vinhos (PDF).
   Textos e preços preservados como no original, inclusive grafias. */

const MENU = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    sections: [
      {
        id: 'pizzas-tradicionais',
        title: 'Pizzas',
        items: [
          { n: 'Toscana', d: 'Molho ao sugo, calabresa moída, mussarela, tomate, orégano, azeite e…', p: [['Pequena', 48], ['Grande', 61]] },
          { n: 'Vegetariana', d: 'Molho ao sugo, mussarela, pimentão colorido, cebola roxa, tomate, orégano,…', p: [['Pequena', 41], ['Grande', 59]] }
        ]
      },
      {
        id: 'bordas',
        title: 'Adicional de Bordas',
        items: ['Catupiry', 'Cheddar', 'Chocolate', 'Cream Cheese'].map(n => ({
          n, d: '', p: [['Tradicional Pequena', 9], ['Tradicional Grande', 15], ['Vulcão/ Caracol Pequena', 12], ['Vulcão/ Caracol Grande', 17]]
        }))
      },
      {
        id: 'pizzas-doces',
        title: 'Pizzas Doces',
        items: [
          { n: 'Brownie', d: 'Base de chocolate avelã, pedaços de brownie e alpino meio amargo', p: [['Pequena', 44], ['Grande', 63]] },
          { n: 'Creme de Pistache e Nutela', d: 'Creme de pistache e chocolate com avelã.', p: [['Pequena', 43], ['Grande', 62]] },
          { n: 'Chocolate com morango', d: 'Chocolate com avelã e morango.', p: [['Pequena', 39], ['Grande', 55]] },
          { n: 'KitKat', d: 'Chocolate ao leite e kitkat.', p: [['Pequena', 41]] },
          { n: 'M&Ms', d: "Chocolate com avelã e M&M's.", p: [['Pequena', 43], ['Grande', 61]] },
          { n: 'Brigadeiro', d: 'Chocolate ao leite e granulado.', p: [['Pequena', 34], ['Grande', 48]] },
          { n: 'Banoffe', d: 'Doce de leite, chantilly, banana. farofa de biscoito e canela', p: [['Pequena', 36], ['Grande', 52]] },
          { n: 'Cheese Cake', d: 'Chocolate branco, cream cheese e calda de morango.', p: [['Pequena', 41], ['Grande', 59]] },
          { n: 'Dueto Crocante', d: 'Chocolate com avelã, chocolate branco e castanha de caju.', p: [['Pequena', 43], ['Grande', 61]] },
          { n: 'Laka', d: 'Chocolate ao leite e laka.', p: [['Pequena', 41], ['Grande', 59]] },
          { n: 'Nutella Suprema', d: 'Chocolate com avelã, creme de ninho e leite em pó.', p: [['Pequena', 44], ['Grande', 63]] },
          { n: 'Ninho com Morango', d: 'Creme de ninho, leite em pó e morangos.', p: [['Pequena', 43], ['Grande', 62]] },
          { n: 'Prestígio', d: 'Chocolate ao leite e coco ralado.', p: [['Pequena', 34], ['Grande', 48]] }
        ]
      }
    ]
  },
  {
    id: 'esfihas',
    title: 'Esfihas & Calzones',
    sections: [
      {
        id: 'calzones',
        title: 'Calzones',
        items: [
          { n: 'Carne de Sol com Cream Cheese', d: 'Carne de sol desfiada, mussarela, cream cheese, orégano e parmesão.', p: [['', 41]] },
          { n: 'Frango com Catupiry', d: 'Frango desfiado, mussarela, caupiry, orégano e parmesão.', p: [['', 35]] },
          { n: 'Frango com Cream Creese', d: 'Carne de sol desfiada, mussarela, cream cheese, orégano.', p: [['', 33]] },
          { n: 'Pepperoni', d: 'Mussarela, pepperoni, oregano e parmesão.', p: [['', 35]] },
          { n: 'Quatro Queijos', d: 'Mussarela, parmesão, catupiry, provolone e orégano', p: [['', 35]] }
        ]
      },
      {
        id: 'esfihas-especiais',
        title: 'Esfihas Especiais',
        items: [
          { n: 'Bacon', d: 'Mussarela e bacon em fatias.', p: [['', 12]] },
          { n: 'Bauru', d: 'Presunto, mussarela e tomate.', p: [['', 11]] },
          { n: 'Calabresa com Cheddar', d: 'Calabresa moida e cheddar.', p: [['', 14]] },
          { n: 'Calabresa com Queijo', d: 'Calabresa moida e mussarela.', p: [['', 12]] },
          { n: 'Carne de Sol', d: 'Carne de sol e mussarela.', p: [['', 14]] },
          { n: 'Carne de Sol Cream Cheese', d: 'Carne de sol, mussarela e cream cheese.', p: [['', 15]] },
          { n: 'Camarão', d: 'Mussarela, catupiry e camarão.', p: [['', 15]] },
          { n: 'Camarão com Cream Cheese', d: 'Mussarela, camarão e cream cheese.', p: [['', 16]] },
          { n: 'Caipira', d: 'Frango desfiado, catupiry e milho.', p: [['', 11]] },
          { n: 'Frango com Catupiry', d: 'Frango desfiado e catupiry.', p: [['', 12]] },
          { n: 'Carne com Queijo', d: 'Carne, cebola, tomate e cheddar.', p: [['', 13]] },
          { n: 'Frango com Cream Cheese', d: 'Frango desfiado e cream cheese.', p: [['', 13]] },
          { n: 'Frango com Queijo', d: 'Frango desfiado e mussarela.', p: [['', 12]] },
          { n: 'Carne', d: 'Carne, cebola e tomate.', p: [['', 13]] },
          { n: 'Frango com Cheddar', d: 'Frango desfiado e cheddar.', p: [['', 12]] },
          { n: 'Peperoni', d: 'Mussarela e peperoni.', p: [['', 13]] },
          { n: 'Picanha', d: 'Mussarela, picanha e cream cheese.', p: [['', 15]] },
          { n: 'Quatro Queijos', d: 'Mussarela, parmesão, provolone e catupiry.', p: [['', 13]] },
          { n: 'Salmão', d: 'Mussarela, salmão e cream cheese.', p: [['', 16]] }
        ]
      },
      {
        id: 'esfihas-tradicionais',
        title: 'Esfihas Tradicionais',
        items: [
          { n: 'Franbacon', d: 'Frango desfiado, mussarela e bacon em fatias.', p: [['', 10]] },
          { n: 'Calabresa', d: 'Calabresa moída e rodelas de cebola.', p: [['', 10]] },
          { n: 'Queijo', d: 'Mussarela.', p: [['', 10]] }
        ]
      },
      {
        id: 'esfihas-doces',
        title: 'Esfihas Doces',
        items: [
          { n: 'Brigadeiro', d: 'Chocolate ao leite e granulado.', p: [['', 11]] },
          { n: 'Banana Nevada', d: 'Chocolate brando, banana e canela.', p: [['', 12]] },
          { n: 'Pistache e Chocolate', d: 'Creme de pistache e chocolate com avelã.', p: [['', 14]] },
          { n: 'Cheese Cake', d: 'Chocolate branco, cream cheese e calda de morango.', p: [['', 14]] },
          { n: 'KitKat', d: 'Chocolate ao leite e Kit Kat.', p: [['', 15]] },
          { n: 'Laka', d: 'Chocolate ao leite e Laka.', p: [['', 15]] },
          { n: 'Nutella Suprema', d: 'Chocolate com avelã, creme de ninho e leite em pó.', p: [['', 14]] },
          { n: 'Morango', d: 'Cholocate ao leite e morango.', p: [['', 13]] },
          { n: 'M&M´s', d: "Chocolate com avelã e M&M's.", p: [['', 14]] },
          { n: 'Brownie', d: 'Chocolate com avelã, pedaços de brownie e chocolate alpino.', p: [['', 15]] }
        ]
      },
      {
        id: 'esfihas-combos',
        title: 'Combos de Esfihas',
        items: [
          { n: '10 Esfihas Tradicionais', d: '', p: [['', 90]] },
          { n: '15 Esfihas Tradicionais', d: '', p: [['', 130]] },
          { n: '20 Esfihas Tradicionais', d: '', p: [['', 170]] }
        ]
      }
    ]
  }
];

const WINES = [
  { id: 'champagnes', title: 'Champagnes', items: [
    ['Möet Chandon Imperial Brut', 629], ['Veuve Clicquot', 659]
  ]},
  { id: 'espumantes', title: 'Espumantes', items: [
    ['Chandon Reserve Brut', 185], ['Chandon Passion', 189], ['Monte Paschoal Moscatel Ice', 90],
    ['Casa Valduga Naturelle Moscatel Rosé', 149], ['Ponto Nero Celebration Brut', 120]
  ]},
  { id: 'brancos', title: 'Vinhos Brancos', items: [
    ['Naturelle (Suave)', 130], ['Nero Freebie (Frisante Suave)', 90], ['Mayos Gree (Frisante Suave)', 99],
    ['Monte Paschoal (Frisante Suave)', 80], ['Tarapacá Reserva Sauvignon Blanc', 199],
    ['Monte Infinitus Sauvignon Blanc', 69], ['Alamos Chardonnay', 229], ['Dv Catena Chardonnay', 449],
    ['Casal Mendes (Vinho Verde)', 128], ['Rendez Vous Blanc', 229], ['Giacondi Lambrusco (Suave)', 140],
    ['Giacondi T Sic Pinot Grigio', 180], ['Black Tower Club Edt Sauvignon Blanc', 199]
  ]},
  { id: 'roses', title: 'Vinhos Rosés', items: [
    ['Monte Paschoal Pinot Noir', 119], ['Naturelle (Frisante Suave)', 129], ['Mayos Pink (Frisante Suave)', 99],
    ['Cosecha', 89], ['Monte Infinitus', 69], ['Morandé Visionário', 89], ['Emiliana Adobe', 189],
    ['Mateus', 149], ['Casal Mendes', 128], ['Ted The Mule', 180], ['Giacondi', 135],
    ['Tous À La Mer', 249], ['Don Luciano Cosecha', 99]
  ]},
  { id: 'tintos', title: 'Vinhos Tintos', items: [
    ['Naturelle (Suave)', 129], ['Arte Blend Cabernet S. Merlot', 135], ['Morandé Pionero Reserva Pinot Noir', 119],
    ['Morandé Pionero Reserva Merlot', 119], ['Morandé Visionário Carménère', 89], ['Cosecha Cabernet Sauvignon', 89],
    ['Mil Raízes Cabernet Sauvignon', 75], ['Cordero Piel Malbec', 149], ['Catena Zapata Malbec', 379],
    ['Dv Catena Cabernet Malbec', 399], ['Alamos Cabernet Sauvignon', 229], ['El Enemigo Bonarda La Esperanza', 449],
    ['Benjamin Malbec', 99], ['Jp Azeitão', 125], ['Casal Mendes Sweet Red (vinho verde suave)', 125],
    ['Ea Tinto', 190], ['Cartuxa Colheita', 555], ['Giacondi Lambrusco Rosso', 140],
    ["Montepulciano D'abruzzo", 125], ['Chianti Docg 1l Ceprone Igt', 159], ['Rendez Vous Pinot Noir', 240],
    ['Don Luciano Cosecha Tempranillo', 89]
  ]},
  { id: 'v375', title: 'Vinhos de 375ml', items: [
    ['Morandé Pionero Reserva Carménère 375ml', 59], ['Tarapacá Cabernet Sauvignon 375ml', 105],
    ['Morandé Pionero Sauvignon Blanc 375ml', 59]
  ]},
  { id: 'v187', title: 'Vinhos de 187ml', items: [
    ['Pionero Reserva Cabernet Sauvignon 187ml', 35], ['Pionero Reserva Sauvignon Blanc 187ml', 35]
  ]},
  { id: 'mesa', title: 'Vinho de Mesa', items: [
    ['Quinta Do Morgado Frisante Rosé (Suave)', 60], ['Quinta Do Morgado Bordô (Suave)', 55]
  ]},
  { id: 'tacas', title: 'Taças de Vinho', items: [
    ['Viejo Viñedo Tinto', 16], ['Monte Infinitus Cabernet Tinto', 19], ['Monte Infinitus Rosé', 19],
    ['Viejo Viñedo Branco', 16], ['Monte Infinitus Chardonnay Branco', 19]
  ]}
];
