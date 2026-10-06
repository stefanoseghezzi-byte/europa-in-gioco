// Dati degli Stati (carta d'identità). Valori arrotondati, aggiornati a circa il 2024-2026.
// liv: 1 = facile, 2 = medio, 3 = difficile (ogni livello include i precedenti)
// ue: true se lo Stato è membro dell'Unione europea (27 Stati)
// sup in km², ab in persone. area: macro-regione usata nei quiz.
(function () {
  const P = [];
  const S = (id, nome, cap, liv, area, pos, sup, ab, mon, lin, gov, ue, ueTxt, euro, sch, conf, chicca, nota) =>
    P.push({ id, nome, cap, liv, area, pos, sup, ab, mon, lin, gov, ue, ueTxt, euro, sch, conf: conf ? conf.split(', ') : [], chicca, nota });

  // ---------- Livello 1 ----------
  S('ESP', 'Spagna', 'Madrid', 1, 'Europa meridionale', 'Penisola iberica, tra Atlantico e Mediterraneo', 505990, 48600000, 'Euro', 'Spagnolo (castigliano)', 'Monarchia parlamentare', true, 'Dal 1986', true, true, 'Portogallo, Francia, Andorra',
    'Oltre allo spagnolo, in alcune regioni sono ufficiali anche catalano, basco e galiziano.');
  S('PRT', 'Portogallo', 'Lisbona', 1, 'Europa meridionale', 'Penisola iberica, sulla costa atlantica', 92230, 10450000, 'Euro', 'Portoghese', 'Repubblica semipresidenziale', true, 'Dal 1986', true, true, 'Spagna',
    'Il confine con la Spagna è uno dei più antichi d\'Europa: è quasi invariato dal 1297.');
  S('FRA', 'Francia', 'Parigi', 1, 'Europa occidentale', 'Europa occidentale, sull\'Atlantico e sul Mediterraneo', 551500, 66000000, 'Euro', 'Francese', 'Repubblica semipresidenziale', true, 'Dal 1957 (fondatore)', true, true, 'Belgio, Lussemburgo, Germania, Svizzera, Italia, Monaco, Spagna, Andorra',
    'Con i territori d\'oltremare ha più fusi orari di qualsiasi altro Stato al mondo.', 'Dati riferiti alla Francia metropolitana (senza l\'oltremare).');
  S('ITA', 'Italia', 'Roma', 1, 'Europa meridionale', 'Europa meridionale: una penisola nel Mediterraneo, con Sicilia e Sardegna', 302070, 58950000, 'Euro', 'Italiano', 'Repubblica parlamentare', true, 'Dal 1957 (fondatore)', true, true, 'Francia, Svizzera, Austria, Slovenia, San Marino, Città del Vaticano',
    'Dentro i suoi confini ci sono due Stati indipendenti: San Marino e Città del Vaticano.');
  S('DEU', 'Germania', 'Berlino', 1, 'Europa centrale', 'Europa centrale, tra Mare del Nord, Baltico e Alpi', 357600, 83450000, 'Euro', 'Tedesco', 'Repubblica federale (16 Länder)', true, 'Dal 1957 (fondatore)', true, true, 'Danimarca, Polonia, Repubblica Ceca, Austria, Svizzera, Francia, Lussemburgo, Belgio, Paesi Bassi',
    'Confina con 9 Stati, più di ogni altro Paese dell\'UE (escludendo i territori d\'oltremare).');
  S('GBR', 'Regno Unito', 'Londra', 1, 'Europa occidentale', 'Isole britanniche, nell\'Atlantico settentrionale', 243600, 68300000, 'Sterlina', 'Inglese', 'Monarchia parlamentare', false, 'Uscito nel 2020 (Brexit)', false, false, 'Irlanda (sul confine dell\'Irlanda del Nord)',
    'È formato da quattro nazioni: Inghilterra, Scozia, Galles e Irlanda del Nord. Ha lasciato l\'UE il 31 gennaio 2020.');
  S('IRL', 'Irlanda', 'Dublino', 1, 'Europa occidentale', 'Isole britanniche: occupa gran parte dell\'isola d\'Irlanda', 70300, 5380000, 'Euro', 'Irlandese e inglese', 'Repubblica parlamentare', true, 'Dal 1973', true, false, 'Regno Unito (Irlanda del Nord)',
    'Il confine con l\'Irlanda del Nord è oggi un confine tra UE e Regno Unito.');
  S('ISL', 'Islanda', 'Reykjavík', 1, 'Europa settentrionale', 'Isola vulcanica nell\'Atlantico settentrionale', 103000, 390000, 'Corona islandese', 'Islandese', 'Repubblica parlamentare', false, 'Non UE (ha ritirato la candidatura; è nello SEE)', false, true, '',
    'Il suo parlamento, l\'Althing, è tra i più antichi del mondo: risale al 930 d.C.');
  S('NOR', 'Norvegia', 'Oslo', 1, 'Europa settentrionale', 'Penisola scandinava, sull\'Atlantico e sull\'Artico', 385200, 5550000, 'Corona norvegese', 'Norvegese', 'Monarchia parlamentare', false, 'Non UE (ha detto no due volte; è nello SEE)', false, true, 'Svezia, Finlandia, Russia',
    'Pur essendo tra i Paesi più ricchi d\'Europa, i norvegesi hanno votato NO all\'ingresso nell\'UE nel 1972 e nel 1994.');
  S('SWE', 'Svezia', 'Stoccolma', 1, 'Europa settentrionale', 'Penisola scandinava, sul Mar Baltico', 450300, 10550000, 'Corona svedese', 'Svedese', 'Monarchia parlamentare', true, 'Dal 1995', false, true, 'Norvegia, Finlandia',
    'È nell\'UE ma ha rifiutato l\'euro con un referendum nel 2003.');
  S('FIN', 'Finlandia', 'Helsinki', 1, 'Europa settentrionale', 'Europa nord-orientale, tra Svezia e Russia', 338500, 5600000, 'Euro', 'Finlandese e svedese', 'Repubblica parlamentare', true, 'Dal 1995', true, true, 'Svezia, Norvegia, Russia',
    'Confina con la Russia per circa 1340 km, il più lungo confine terrestre dell\'UE con la Russia; dal 2023 è nella NATO.');
  S('DNK', 'Danimarca', 'Copenaghen', 1, 'Europa settentrionale', 'Penisola dello Jutland e isole, tra Mare del Nord e Baltico', 43100, 5950000, 'Corona danese', 'Danese', 'Monarchia parlamentare', true, 'Dal 1973', false, true, 'Germania',
    'Il Regno di Danimarca comprende anche la Groenlandia, la più grande isola del mondo, e le isole Fær Øer.');
  S('NLD', 'Paesi Bassi', 'Amsterdam', 1, 'Europa occidentale', 'Europa occidentale, sul Mare del Nord', 41500, 17900000, 'Euro', 'Olandese (neerlandese)', 'Monarchia parlamentare', true, 'Dal 1957 (fondatore)', true, true, 'Germania, Belgio',
    'Circa un quarto del territorio è sotto il livello del mare.', 'Il governo ha sede all\'Aia, ma la capitale è Amsterdam.');
  S('BEL', 'Belgio', 'Bruxelles', 1, 'Europa occidentale', 'Europa occidentale, sul Mare del Nord', 30700, 11800000, 'Euro', 'Olandese, francese, tedesco', 'Monarchia federale', true, 'Dal 1957 (fondatore)', true, true, 'Paesi Bassi, Germania, Lussemburgo, Francia',
    'Bruxelles ospita le principali istituzioni dell\'UE e il quartier generale della NATO.');
  S('CHE', 'Svizzera', 'Berna', 1, 'Europa centrale', 'Europa centrale, tra le Alpi e il Giura', 41300, 8960000, 'Franco svizzero', 'Tedesco, francese, italiano, romancio', 'Repubblica federale (26 cantoni)', false, 'Non UE (accordi bilaterali)', false, true, 'Germania, Francia, Italia, Austria, Liechtenstein',
    'Non è nell\'UE, ma fa parte di Schengen e del mercato unico grazie ad accordi bilaterali.');
  S('AUT', 'Austria', 'Vienna', 1, 'Europa centrale', 'Europa centrale, in gran parte sulle Alpi', 83900, 9170000, 'Euro', 'Tedesco', 'Repubblica federale', true, 'Dal 1995', true, true, 'Germania, Repubblica Ceca, Slovacchia, Ungheria, Slovenia, Italia, Svizzera, Liechtenstein',
    'È neutrale dal 1955 e confina con 8 Stati.');
  S('POL', 'Polonia', 'Varsavia', 1, 'Europa centrale', 'Europa centro-orientale, sul Mar Baltico', 312700, 36600000, 'Złoty', 'Polacco', 'Repubblica parlamentare', true, 'Dal 2004', false, true, 'Germania, Repubblica Ceca, Slovacchia, Ucraina, Bielorussia, Lituania, Russia',
    'È il Paese più popoloso tra quelli entrati nell\'UE nel 2004.');
  S('CZE', 'Repubblica Ceca', 'Praga', 1, 'Europa centrale', 'Europa centrale, senza sbocco sul mare', 78900, 10900000, 'Corona ceca', 'Ceco', 'Repubblica parlamentare', true, 'Dal 2004', false, true, 'Germania, Polonia, Slovacchia, Austria',
    'Dal 1993 è indipendente: la Cecoslovacchia si divise pacificamente in Repubblica Ceca e Slovacchia.');
  S('HUN', 'Ungheria', 'Budapest', 1, 'Europa centrale', 'Europa centrale, nella pianura pannonica', 93000, 9590000, 'Fiorino ungherese', 'Ungherese', 'Repubblica parlamentare', true, 'Dal 2004', false, true, 'Austria, Slovacchia, Ucraina, Romania, Serbia, Croazia, Slovenia',
    'Budapest è nata nel 1873 dall\'unione di tre città: Buda, Óbuda e Pest, divise dal Danubio.');
  S('ROU', 'Romania', 'Bucarest', 1, 'Europa orientale', 'Europa orientale, tra Carpazi e Mar Nero', 238400, 19000000, 'Leu rumeno', 'Rumeno', 'Repubblica semipresidenziale', true, 'Dal 2007', false, true, 'Ungheria, Ucraina, Moldavia, Bulgaria, Serbia',
    'Ospita gran parte del delta del Danubio, patrimonio UNESCO e riserva naturale.');
  S('GRC', 'Grecia', 'Atene', 1, 'Europa meridionale', 'Estremità meridionale della penisola balcanica, con migliaia di isole', 132000, 10400000, 'Euro', 'Greco', 'Repubblica parlamentare', true, 'Dal 1981', true, true, 'Albania, Macedonia del Nord, Bulgaria, Turchia',
    'Ha oltre 6000 tra isole e isolotti, ma solo circa 200 sono abitate.');
  S('UKR', 'Ucraina', 'Kiev', 1, 'Europa orientale', 'Europa orientale, sul Mar Nero e sul Mar d\'Azov', 603500, 38000000, 'Grivnia', 'Ucraino', 'Repubblica semipresidenziale', false, 'Candidata (dal 2022)', false, false, 'Polonia, Slovacchia, Ungheria, Romania, Moldavia, Bielorussia, Russia',
    'È il più grande Stato interamente europeo; ha lo status di Paese candidato all\'UE dal giugno 2022.', 'Il numero di abitanti è una stima: la guerra ha cambiato i dati.');
  S('RUS', 'Russia', 'Mosca', 1, 'Europa orientale', 'Europa orientale e Asia settentrionale', 17098000, 146000000, 'Rublo russo', 'Russo', 'Repubblica federale semipresidenziale', false, 'Non UE', false, false, 'Norvegia, Finlandia, Estonia, Lettonia, Lituania, Polonia, Bielorussia, Ucraina',
    'È lo Stato più grande del mondo e si estende su 11 fusi orari.', 'Solo circa 4 milioni di km² si trovano in Europa; il resto è in Asia.');
  S('TUR', 'Turchia', 'Ankara', 1, 'Europa orientale', 'Tra Europa sud-orientale e Asia occidentale', 783600, 85500000, 'Lira turca', 'Turco', 'Repubblica presidenziale', false, 'Candidata (dal 1999, trattative bloccate)', false, false, 'Grecia, Bulgaria',
    'Istanbul è una grande città situata su due continenti, separati dallo stretto del Bosforo.', 'Solo circa il 3% del territorio è in Europa.');

  // ---------- Livello 2 ----------
  S('BGR', 'Bulgaria', 'Sofia', 2, 'Balcani', 'Penisola balcanica, sul Mar Nero', 111000, 6440000, 'Euro (dal 2026)', 'Bulgaro', 'Repubblica parlamentare', true, 'Dal 2007', true, true, 'Romania, Serbia, Macedonia del Nord, Grecia, Turchia',
    'Dal 1° gennaio 2026 ha adottato l\'euro, diventando il 21° Paese dell\'eurozona.');
  S('HRV', 'Croazia', 'Zagabria', 2, 'Balcani', 'Tra Pianura pannonica e costa adriatica', 56600, 3860000, 'Euro', 'Croato', 'Repubblica parlamentare', true, 'Dal 2013', true, true, 'Slovenia, Ungheria, Serbia, Bosnia ed Erzegovina, Montenegro',
    'Dal 1° gennaio 2023 è entrata sia nell\'euro sia nell\'area Schengen.');
  S('SVK', 'Slovacchia', 'Bratislava', 2, 'Europa centrale', 'Europa centrale, senza sbocco sul mare', 49000, 5420000, 'Euro', 'Slovacco', 'Repubblica parlamentare', true, 'Dal 2004', true, true, 'Repubblica Ceca, Polonia, Ucraina, Ungheria, Austria',
    'Bratislava è l\'unica capitale al mondo che confina con due Stati stranieri: Austria e Ungheria.');
  S('SVN', 'Slovenia', 'Lubiana', 2, 'Europa centrale', 'Tra Alpi e Adriatico', 20300, 2120000, 'Euro', 'Sloveno', 'Repubblica parlamentare', true, 'Dal 2004', true, true, 'Italia, Austria, Ungheria, Croazia',
    'È stata la prima ex repubblica jugoslava a entrare nell\'UE (2004) e ad adottare l\'euro (2007).');
  S('EST', 'Estonia', 'Tallinn', 2, 'Europa settentrionale', 'Paesi baltici, sul Golfo di Finlandia', 45300, 1370000, 'Euro', 'Estone', 'Repubblica parlamentare', true, 'Dal 2004', true, true, 'Lettonia, Russia',
    'È tra i Paesi più digitali al mondo: si può votare online dal 2005.');
  S('LVA', 'Lettonia', 'Riga', 2, 'Europa settentrionale', 'Paesi baltici, sul Mar Baltico', 64600, 1870000, 'Euro', 'Lettone', 'Repubblica parlamentare', true, 'Dal 2004', true, true, 'Estonia, Lituania, Russia, Bielorussia',
    'Più della metà del territorio è coperta da foreste.');
  S('LTU', 'Lituania', 'Vilnius', 2, 'Europa settentrionale', 'Paesi baltici, sul Mar Baltico', 65300, 2890000, 'Euro', 'Lituano', 'Repubblica semipresidenziale', true, 'Dal 2004', true, true, 'Lettonia, Bielorussia, Polonia, Russia (Kaliningrad)',
    'Nel 1990 fu la prima repubblica sovietica a dichiarare l\'indipendenza dall\'URSS.');
  S('LUX', 'Lussemburgo', 'Lussemburgo', 2, 'Europa occidentale', 'Europa occidentale, senza sbocco sul mare', 2586, 670000, 'Euro', 'Lussemburghese, francese, tedesco', 'Granducato (monarchia costituzionale)', true, 'Dal 1957 (fondatore)', true, true, 'Belgio, Germania, Francia',
    'È l\'unico granducato rimasto al mondo.');
  S('CYP', 'Cipro', 'Nicosia', 2, 'Europa meridionale', 'Isola del Mediterraneo orientale (geograficamente vicina all\'Asia)', 9250, 930000, 'Euro', 'Greco e turco', 'Repubblica presidenziale', true, 'Dal 2004', true, false, '',
    'L\'isola è divisa dal 1974: il nord è controllato dalla Turchia ed è riconosciuto solo da Ankara.', 'Dati riferiti alla parte controllata dal governo di Cipro.');
  S('SRB', 'Serbia', 'Belgrado', 2, 'Balcani', 'Penisola balcanica, senza sbocco sul mare', 77500, 6600000, 'Dinaro serbo', 'Serbo', 'Repubblica parlamentare', false, 'Candidata (dal 2012)', false, false, 'Ungheria, Romania, Bulgaria, Macedonia del Nord, Kosovo, Montenegro, Bosnia ed Erzegovina, Croazia',
    'Non riconosce l\'indipendenza del Kosovo, che considera una propria provincia.');
  S('BLR', 'Bielorussia', 'Minsk', 2, 'Europa orientale', 'Europa orientale, senza sbocco sul mare', 207600, 9100000, 'Rublo bielorusso', 'Bielorusso e russo', 'Repubblica presidenziale', false, 'Non UE', false, false, 'Polonia, Lituania, Lettonia, Russia, Ucraina',
    'Condivide con la Polonia la foresta di Białowieża, una delle ultime foreste primarie d\'Europa.');
  S('BIH', 'Bosnia ed Erzegovina', 'Sarajevo', 2, 'Balcani', 'Penisola balcanica, con un piccolo tratto di costa adriatica', 51200, 3200000, 'Marco convertibile', 'Bosniaco, croato, serbo', 'Repubblica federale', false, 'Candidata (dal 2022)', false, false, 'Croazia, Serbia, Montenegro',
    'È divisa in due entità, la Federazione di Bosnia ed Erzegovina e la Repubblica Serba, più il distretto di Brčko.');
  S('ALB', 'Albania', 'Tirana', 2, 'Balcani', 'Penisola balcanica, sull\'Adriatico e sullo Ionio', 28700, 2400000, 'Lek', 'Albanese', 'Repubblica parlamentare', false, 'Candidata (dal 2014)', false, false, 'Montenegro, Kosovo, Macedonia del Nord, Grecia',
    'Fino al 1991 è stato uno dei Paesi più isolati del mondo, governato da un regime comunista chiuso.');
  S('MKD', 'Macedonia del Nord', 'Skopje', 2, 'Balcani', 'Penisola balcanica, senza sbocco sul mare', 25700, 1830000, 'Dinaro macedone', 'Macedone', 'Repubblica parlamentare', false, 'Candidata (dal 2005)', false, false, 'Kosovo, Serbia, Bulgaria, Grecia, Albania',
    'Nel 2019 ha cambiato nome in «Macedonia del Nord» per risolvere una disputa con la Grecia.');
  S('MNE', 'Montenegro', 'Podgorica', 2, 'Balcani', 'Penisola balcanica, sul Mar Adriatico', 13800, 620000, 'Euro (non UE)', 'Montenegrino', 'Repubblica parlamentare', false, 'Candidata (dal 2010)', true, false, 'Croazia, Bosnia ed Erzegovina, Serbia, Kosovo, Albania',
    'Usa l\'euro pur non essendo nell\'UE; il suo nome significa «monte nero».');
  S('MDA', 'Moldavia', 'Chisinau', 2, 'Europa orientale', 'Europa orientale, tra Romania e Ucraina', 33850, 2400000, 'Leu moldavo', 'Rumeno', 'Repubblica parlamentare', false, 'Candidata (dal 2022)', false, false, 'Romania, Ucraina',
    'La regione della Transnistria si è separata di fatto dal governo di Chisinau nel 1990-92, senza riconoscimento internazionale.', 'Dati senza la Transnistria.');

  // ---------- Livello 3 ----------
  S('MLT', 'Malta', 'La Valletta', 3, 'Europa meridionale', 'Arcipelago nel Mediterraneo centrale, a sud della Sicilia', 316, 570000, 'Euro', 'Maltese e inglese', 'Repubblica parlamentare', true, 'Dal 2004', true, true, '',
    'È il Paese più piccolo dell\'UE e uno dei più densamente popolati al mondo.');
  S('XKX', 'Kosovo', 'Pristina', 3, 'Balcani', 'Penisola balcanica, senza sbocco sul mare', 10900, 1600000, 'Euro (non UE)', 'Albanese e serbo', 'Repubblica parlamentare', false, 'Ha presentato domanda (2022)', true, false, 'Serbia, Macedonia del Nord, Albania, Montenegro',
    'Ha dichiarato l\'indipendenza dalla Serbia nel 2008: è riconosciuto da oltre 100 Stati, ma non da cinque Paesi dell\'UE.');
  S('AND', 'Andorra', 'Andorra la Vella', 3, 'Europa meridionale', 'Sui Pirenei, tra Francia e Spagna', 468, 80000, 'Euro (non UE)', 'Catalano', 'Principato parlamentare', false, 'Non UE (accordi speciali)', true, false, 'Francia, Spagna',
    'Ha due co-principi: il presidente della Francia e il vescovo di Urgell.');
  S('MCO', 'Principato di Monaco', 'Monaco', 3, 'Europa occidentale', 'Costa Azzurra, circondato dalla Francia', 2.02, 39000, 'Euro (non UE)', 'Francese', 'Principato (monarchia costituzionale)', false, 'Non UE (accordi speciali)', true, false, 'Francia',
    'È il secondo Stato più piccolo del mondo, dopo la Città del Vaticano.');
  S('SMR', 'San Marino', 'San Marino', 3, 'Europa meridionale', 'Enclave nell\'Italia centro-settentrionale, sul Monte Titano', 61, 34000, 'Euro (non UE)', 'Italiano', 'Repubblica parlamentare', false, 'Non UE (accordi speciali)', true, false, 'Italia',
    'Secondo la tradizione è la più antica repubblica ancora esistente: sarebbe nata nel 301 d.C.');
  S('VAT', 'Città del Vaticano', 'Città del Vaticano', 3, 'Europa meridionale', 'Enclave dentro la città di Roma', 0.44, 800, 'Euro (non UE)', 'Italiano (e latino)', 'Monarchia elettiva (il Papa)', false, 'Non UE (accordi speciali)', true, false, 'Italia',
    'È lo Stato più piccolo del mondo, sia per superficie sia per numero di abitanti.');
  S('LIE', 'Liechtenstein', 'Vaduz', 3, 'Europa centrale', 'Sulle Alpi, tra Svizzera e Austria', 160, 40000, 'Franco svizzero', 'Tedesco', 'Principato parlamentare', false, 'Non UE (è nello SEE)', false, true, 'Svizzera, Austria',
    'È uno dei due Stati al mondo «doppiamente senza sbocco sul mare» (insieme all\'Uzbekistan) e non ha un esercito.');

  window.PAESI = P;
})();
