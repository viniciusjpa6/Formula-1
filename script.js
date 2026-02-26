document.addEventListener('DOMContentLoaded', () => {
	function prettifyFilename(src) {
		const parts = src.split('/').pop().split('.').slice(0, -1).join('.');
		return parts.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
	}

	function ensureCaptionForImages(sectionSelector) {
		const section = document.querySelector(sectionSelector);
		if (!section) return;
		const imgs = Array.from(section.querySelectorAll('img'));
		imgs.forEach(img => {
			if (img.closest('figure')) return; 

			const captionText = (img.alt || '').trim() || prettifyFilename(img.src);

			const figure = document.createElement('figure');
			figure.className = 'img-figure';
			
			if (sectionSelector.includes('equipes')) figure.classList.add('car');
			if (sectionSelector.includes('pistas')) figure.classList.add('track');

			
			img.parentNode.insertBefore(figure, img);
			figure.appendChild(img);

			const figcap = document.createElement('figcaption');
			figcap.textContent = captionText;
			figure.appendChild(figcap);
		});
	}

	ensureCaptionForImages('#equipes');
	ensureCaptionForImages('#pistas'); 

	const teamsInfo = {
		"Alpine F1 Team": "Equipe: BWT Alpine Formula One Team, fundada em 2021, é a equipe de F1 da marca francesa Alpine, parte do Grupo Renault. A equipe tem sede em Enstone, Reino Unido, e é conhecida por sua cor azul distinta. Anteriormente, a equipe competiu como Renault F1 Team antes de ser rebatizada como Alpine. A equipe tem um histórico de sucesso na F1, incluindo vitórias e pódios, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Fernando Alonso, Esteban Ocon e Pierre Gasly.",
		"Aston Martin F1 Team": "Equipe: Aston Martin F1 Team, fundada em 1986, é uma equipe britânica de F1 conhecida por sua cor verde e tradição. A equipe tem sede em Silverstone, Reino Unido, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Sebastian Vettel, Lance Stroll e Fernando Alonso.",
		"Audi F1 Team": "Equipe: Audi F1 Team, fundada em 2021, é uma equipe de F1 da marca alemã Audi. A equipe tem sede em Enstone, Reino Unido, e é conhecida por sua cor preta e branco. A equipe tem um histórico de sucesso na F1, incluindo vitórias e pódios, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Lucas di Grassi, René Rast e Nico Müller.",
		"Scuderia Ferrari HP": "Equipe: Scuderia Ferrari HP, fundada em 1929, é a equipe de F1 da marca italiana Ferrari. A equipe tem sede em Maranello, Itália, e é conhecida por sua cor vermelha icônica. A equipe tem um histórico de sucesso na F1, incluindo múltiplos campeonatos mundiais de pilotos e construtores, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Charles Leclerc, Carlos Sainz Jr. e Sebastian Vettel.",
		"Red Bull F1 Team": "Equipe: Red Bull F1 Team, fundada em 2005, é uma equipe de F1 da marca austríaca Red Bull. A equipe tem sede em Milton Keynes, Reino Unido, e é conhecida por sua cor vermelha e amarela. A equipe tem um histórico de sucesso na F1, incluindo múltiplos campeonatos mundiais de construtores e pilotos, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Max Verstappen, Sergio Pérez e Daniel Ricciardo.",
		"McLaren  F1 Team": "Equipe: McLaren F1 Team, fundada em 1963, é uma equipe britânica de F1 conhecida por sua cor verde e amarela. A equipe tem sede em Woking, Reino Unido, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Lando Norris, Oscar Piastri e Daniel Ricciardo.",
		"Mercedes-AMG F1 Team": "Equipe: Mercedes-AMG F1 Team, fundada em 2010, é uma equipe de F1 da marca alemã Mercedes-Benz. A equipe tem sede em Brackley, Reino Unido, e é conhecida por sua cor preta e branca. A equipe tem um histórico de sucesso na F1, incluindo múltiplos campeonatos mundiais de construtores e pilotos, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Lewis Hamilton, George Russell e Valtteri Bottas.",
		"Williams F1 Team": "Equipe: Williams F1 Team, fundada em 1977, é uma equipe britânica de F1 conhecida por sua cor azul e branca. A equipe tem sede em Grove, Reino Unido, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Alex Albon, Logan Sargeant e Nicholas Latifi.",
		"TGR Haas F1 Team": "Equipe: TGR Haas F1 Team, fundada em 2016, é uma equipe americana de F1 conhecida por sua cor preta e amarela. A equipe tem sede em Kannapolis, Carolina do Norte (EUA), e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Kevin Magnussen, Mick Schumacher e Nikita Mazepin.",
		"Racing Bulls F1 Team": "Equipe: Racing Bulls F1 Team, fundada em 2021, é uma equipe de F1 da marca italiana Racing Bulls. A equipe tem sede em Enstone, Reino Unido, e é conhecida por sua cor vermelha e amarela. A equipe tem um histórico de sucesso na F1, incluindo vitórias e pódios, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Antonio Giovinazzi, Callum Ilott e Robert Shwartzman.",
		"Cadillac F1 Team": "Equipe: Cadillac F1 Team, fundada em 2023, é uma equipe de F1 da marca americana Cadillac. A equipe tem sede em Enstone, Reino Unido, e é conhecida por sua cor preta e prata. A equipe tem um histórico de sucesso na F1, incluindo vitórias e pódios, e é liderada por pilotos talentosos que buscam competir no mais alto nível do automobilismo. Pilotos notáveis incluem Pato O'Ward, Jimmie Johnson e Hélio Castroneves.",
		
		"Grande Prêmio de Abu Dhabi": "Pista: O Grande Prêmio de Abu Dhabi é uma corrida de Fórmula 1 realizada no Circuito de Yas Marina, localizado na ilha de Yas, em Abu Dhabi, Emirados Árabes Unidos. A pista é conhecida por seu layout único, que inclui seções de alta velocidade e curvas desafiadoras, além de ser a única corrida de F1 que ocorre ao entardecer, proporcionando um espetáculo visual impressionante. O circuito tem uma extensão de aproximadamente 5,5 km e é famoso por sua reta principal que passa por baixo de um hotel luxuoso. O Grande Prêmio de Abu Dhabi é tradicionalmente a última corrida da temporada de F1 e tem sido palco de momentos decisivos para o campeonato mundial.",
		"Grande Prêmio da Arábia Saudita": "Pista: O Grande Prêmio da Arábia Saudita é uma corrida de Fórmula 1 realizada no Circuito de Jeddah, localizado na cidade de Jeddah, Arábia Saudita. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 6,2 km, tornando-se um dos mais longos do calendário de F1. O Grande Prêmio da Arábia Saudita é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2021, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Austrália": "Pista: O Grande Prêmio da Austrália é uma corrida de Fórmula 1 realizada no Circuito de Albert Park, localizado em Melbourne, Austrália. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,3 km e é famoso por sua localização pitoresca ao redor do lago Albert Park. O Grande Prêmio da Austrália é tradicionalmente a primeira corrida da temporada de F1 e tem sido palco de momentos emocionantes e imprevisíveis, tornando-se um evento imperdível para os fãs de automobilismo.",
		"Grande Prêmio da Áustria": "Pista: O Grande Prêmio da Áustria é uma corrida de Fórmula 1 realizada no Circuito de Spielberg, localizado na região de Styria, Áustria. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,3 km e é famoso por sua localização pitoresca nas montanhas austríacas. O Grande Prêmio da Áustria é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2014, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do Azerbaijão": "Pista: O Grande Prêmio do Azerbaijão é uma corrida de Fórmula 1 realizada no Circuito de Baku, localizado na cidade de Baku, Azerbaijão. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 6 km e é famoso por sua localização pitoresca ao longo da costa do Mar Cáspio. O Grande Prêmio do Azerbaijão é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2016, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do Bahrein": "Pista: O Grande Prêmio do Bahrein é uma corrida de Fórmula 1 realizada no Circuito Internacional do Bahrein, localizado na cidade de Sakhir, Bahrein. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,4 km e é famoso por sua localização no deserto, o que pode levar a condições de pista variáveis devido à areia soprada pelo vento. O Grande Prêmio do Bahrein é tradicionalmente a segunda corrida da temporada de F1 e tem sido palco de momentos emocionantes e imprevisíveis, tornando-se um evento imperdível para os fãs de automobilismo.",
		"Grande Prêmio de Barcelona": "Pista: O Grande Prêmio de Barcelona é uma corrida de Fórmula 1 realizada no Circuito de Barcelona-Catalunya, localizado em Montmeló, perto de Barcelona, Espanha. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,7 km e é famoso por sua localização pitoresca nas colinas catalãs. O Grande Prêmio de Barcelona é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1991, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Bélgica": "Pista: O Grande Prêmio da Bélgica é uma corrida de Fórmula 1 realizada no Circuito de Spa-Francorchamps, localizado na região de Ardenas, Bélgica. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 7 km e é famoso por sua localização pitoresca nas florestas belgas. O Grande Prêmio da Bélgica é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1925, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do Canadá": "Pista: O Grande Prêmio do Canadá é uma corrida de Fórmula 1 realizada no Circuito Gilles Villeneuve, localizado na ilha de Notre-Dame, em Montreal, Canadá. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,3 km e é famoso por sua localização pitoresca ao longo do rio São Lourenço. O Grande Prêmio do Canadá é tradicionalmente a sétima corrida da temporada de F1 e tem sido palco de momentos emocionantes e imprevisíveis, tornando-se um evento imperdível para os fãs de automobilismo.",
		"Grande Prêmio do Catar": "Pista: O Grande Prêmio do Catar é uma corrida de Fórmula 1 realizada no Circuito de Losail, localizado na cidade de Lusail, Catar. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,4 km e é famoso por sua localização pitoresca no deserto do Catar. O Grande Prêmio do Catar é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2021, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da China": "Pista: O Grande Prêmio da China é uma corrida de Fórmula 1 realizada no Circuito Internacional de Xangai, localizado na cidade de Xangai, China. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,4 km e é famoso por sua localização pitoresca ao longo do rio Huangpu. O Grande Prêmio da China é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2004, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Holanda": "Pista: O Grande Prêmio da Holanda é uma corrida de Fórmula 1 realizada no Circuito de Zandvoort, localizado na cidade de Zandvoort, Holanda. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,3 km e é famoso por sua localização pitoresca ao longo da costa do Mar do Norte. O Grande Prêmio da Holanda é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1952, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Hungria": "Pista: O Grande Prêmio da Hungria é uma corrida de Fórmula 1 realizada no Circuito de Hungaroring, localizado na cidade de Mogyoród, perto de Budapeste, Hungria. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,4 km e é famoso por sua localização pitoresca nas colinas húngaras. O Grande Prêmio da Hungria é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1986, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Inglaterra": "Pista: O Grande Prêmio da Inglaterra é uma corrida de Fórmula 1 realizada no Circuito de Silverstone, localizado na cidade de Silverstone, Inglaterra. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,9 km e é famoso por sua localização pitoresca nas planícies inglesas. O Grande Prêmio da Inglaterra é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1950, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio da Itália": "Pista: O Grande Prêmio da Itália é uma corrida de Fórmula 1 realizada no Circuito de Monza, localizado na cidade de Monza, Itália. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,8 km e é famoso por sua localização pitoresca nas planícies italianas. O Grande Prêmio da Itália é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1950, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do Japão": "Pista: O Grande Prêmio do Japão é uma corrida de Fórmula 1 realizada no Circuito de Suzuka, localizado na cidade de Suzuka, Japão. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,8 km e é famoso por sua localização pitoresca nas montanhas japonesas. O Grande Prêmio do Japão é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1987, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio de Las Vegas": "Pista: O Grande Prêmio de Las Vegas é uma corrida de Fórmula 1 realizada no Circuito de Las Vegas, localizado na cidade de Las Vegas, Nevada, EUA. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 6 km e é famoso por sua localização pitoresca ao longo da famosa Las Vegas Strip. O Grande Prêmio de Las Vegas é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2023, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do México": "Pista: O Grande Prêmio do México é uma corrida de Fórmula 1 realizada no Autódromo Hermanos Rodríguez, localizado na Cidade do México, México. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,3 km e é famoso por sua localização pitoresca nas montanhas mexicanas. O Grande Prêmio do México é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1963, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio de Miami": "Pista: O Grande Prêmio de Miami é uma corrida de Fórmula 1 realizada no Circuito de Miami, localizado na cidade de Miami, Flórida, EUA. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,4 km e é famoso por sua localização pitoresca ao longo da costa de Miami. O Grande Prêmio de Miami é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2022, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio de Mônaco": "Pista: O Grande Prêmio de Mônaco é uma corrida de Fórmula 1 realizada no Circuito de Monte Carlo, localizado na cidade de Monte Carlo, Mônaco. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 3,3 km e é famoso por sua localização pitoresca ao longo da costa do Mediterrâneo. O Grande Prêmio de Mônaco é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1929, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio de São Paulo": "Pista: O Grande Prêmio de São Paulo é uma corrida de Fórmula 1 realizada no Autódromo José Carlos Pace, localizado na cidade de São Paulo, Brasil. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 4,3 km e é famoso por sua localização pitoresca nas colinas paulistas. O Grande Prêmio de São Paulo é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 1973, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio de Singapura": "Pista: O Grande Prêmio de Singapura é uma corrida de Fórmula 1 realizada no Circuito de Marina Bay, localizado na cidade de Singapura. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,1 km e é famoso por sua localização pitoresca ao longo da baía de Marina. O Grande Prêmio de Singapura é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2008, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta.",
		"Grande Prêmio do Texas": "Pista: O Grande Prêmio do Texas é uma corrida de Fórmula 1 realizada no Circuito das Américas, localizado na cidade de Austin, Texas, EUA. A pista é conhecida por seu layout desafiador, que inclui curvas de alta velocidade e retas longas, proporcionando um espetáculo emocionante para os fãs de F1. O circuito tem uma extensão de aproximadamente 5,5 km e é famoso por sua localização pitoresca nas colinas do Texas. O Grande Prêmio do Texas é uma adição relativamente recente ao calendário de F1, tendo sido introduzido em 2012, e rapidamente se tornou uma corrida popular entre os pilotos e fãs devido à sua localização única e ao desafio que apresenta."
	};

	function openTeamModal(name, imgSrc) {
		const modal = document.getElementById('teamModal');
		const titleEl = document.getElementById('teamModalTitle');
		const bodyEl = document.getElementById('teamModalBody');
		titleEl.textContent = name || 'Equipe';
		const info = teamsInfo[name] || 'Informações detalhadas não encontradas. Você pode adicionar mais dados no arquivo script.js.';
		bodyEl.innerHTML = `
			<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">
				<div style="flex:1 1 260px;max-width:420px"><img src="${imgSrc}" alt="${name}" style="width:100%;height:auto;border-radius:6px;border:1px solid rgba(255,255,255,0.06)"></div>
				<div style="flex:1 1 200px;min-width:180px">${info}</div>
			</div>`;
		modal.setAttribute('aria-hidden','false');

		const closeBtn = modal.querySelector('.modal-close');
		if (closeBtn) closeBtn.focus();
	}

	function closeTeamModal() {
		const modal = document.getElementById('teamModal');
		if (!modal) return;
		modal.setAttribute('aria-hidden','true');
	}

	const equipeCaptions = document.querySelectorAll('#equipes figcaption');
	equipeCaptions.forEach(cap => {
		cap.style.cursor = 'pointer';
		cap.setAttribute('tabindex', '0');
		cap.addEventListener('click', () => {
			const name = cap.textContent.trim();
			const img = cap.closest('figure')?.querySelector('img');
			openTeamModal(name, img ? img.src : '');
		});
		cap.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				cap.click();
			}
		});
	});

	const modalEl = document.getElementById('teamModal');
	if (modalEl) {
		modalEl.addEventListener('click', (e) => {
			if (e.target === modalEl) closeTeamModal();
		});
		const closeBtn = modalEl.querySelector('.modal-close');
		if (closeBtn) closeBtn.addEventListener('click', closeTeamModal);
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeTeamModal();
		});
	}
});
