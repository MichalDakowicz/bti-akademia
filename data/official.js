/* 8 pytań z oficjalnego testu próbnego BTI 2026 (konkursy.wi.pb.edu.pl). Treść pytań i opcji przepisana z platformy.
   Poprawne odpowiedzi i uzasadnienia wyprowadzone z dokumentacji (platforma nie ujawnia klucza przed zakończeniem próby). */
(function(){
const add=(c,q)=>{q.src='o';BANK[c].qs.push(q)};

add('azure',{p:1,q:'Kiedy Microsoft po raz pierwszy zaprezentował platformę chmurową Azure?',o:[
['2008',1,'Windows Azure (nazwa kodowa „Red Dog”) zaprezentowano na konferencji PDC w październiku 2008 r.'],
['2005',0,'W 2005 r. Azure jeszcze nie istniało publicznie.'],
['2013',0,'W 2013 r. usługa była już dostępna od lat (w 2014 r. zmieniono nazwę na Microsoft Azure).'],
['2010',0,'To rok <b>ogólnej dostępności</b> komercyjnej (1 lutego 2010), a nie pierwszej prezentacji.']],
tip:'Pułapka rozróżnienia: zaprezentowano (2008) ≠ udostępniono komercyjnie (2010) ≠ zmiana nazwy na Microsoft Azure (2014).'});

add('ai',{p:1,q:'Jakie są założenia modelu regresji liniowej?',o:[
['Związek między zmiennymi niezależnymi i zależnymi jest liniowy.',1,'Podstawowe założenie – model dopasowuje prostą/hiperpłaszczyznę.'],
['Pomiędzy zmiennymi niezależnymi nie powinna występować współliniowość.',1,'Silna współliniowość destabilizuje estymację współczynników.'],
['Zmienne niezależne muszą mieć rozkład normalny.',0,'Nie muszą. Założenie normalności dotyczy <b>reszt</b>, a nie cech.'],
['Reszty mają rozkład normalny.',1,'Założenie potrzebne głównie do wnioskowania statystycznego (testy, przedziały ufności).']],
tip:'Klasyczne założenia: liniowość, niezależność reszt, homoskedastyczność, normalność reszt, brak współliniowości. Cechy nie muszą być normalne.'});

add('frontend',{p:1,q:'Która z poniższych przeglądarek jest aktualnie wspierana:',o:[
['Internet Explorer',0,'Microsoft zakończył wsparcie Internet Explorera 11 15 czerwca 2022 r. (zastąpiony przez Edge).'],
['Opera',1,'Rozwijana, oparta na silniku Chromium.'],
['Brave',1,'Aktywnie rozwijana przeglądarka oparta na Chromium.'],
['Safari',1,'Rozwijana przez Apple dla macOS, iOS i iPadOS.']],
tip:'Pytanie jest wielokrotnego wyboru: IE odpada, reszta to aktywnie rozwijane przeglądarki.'});

add('cpp',{p:1,q:'Polecenie poprzedzone znakiem "#" w języku C++ są:',o:[
['wstawka assemblerowa',0,'Asembler wstawia się przez asm(...), a nie przez #.'],
['oznaczeniem kodu przeznaczonego do optymalizacji przez kompilator',0,'Optymalizacja jest sterowana flagami kompilatora (np. -O2), nie znakiem #.'],
['poleceniami dla preprocesora',1,'Dyrektywy #include, #define, #ifdef itd. przetwarza preprocesor przed kompilacją.'],
['komentarzem w kodzie',0,'Komentarze to // i /* */. # jako komentarz występuje w Pythonie czy bashu.']],
tip:'#include = wstaw plik, #define = makro, #ifdef = kompilacja warunkowa – to wszystko praca preprocesora.'});

add('csharp',{p:1,q:'W języku c# zmienne muszą być nazywane zgodnie z konkretnymi zasadami, m.in:',o:[
['mogą być nazwane słowami kluczowymi C# pod warunkiem że zaczynają się od @',1,'Tzw. verbatim identifier: <code>@class</code>, <code>@int</code> jest poprawną nazwą.'],
['nie mają ograniczenia liczby znaków',0,'<b>Opcja niejednoznaczna.</b> Specyfikacja C# nie podaje formalnego limitu długości, ale kompilator i metadane mają limity praktyczne. Przy zerowaniu za jedną pomyłkę bezpieczniej jej nie zaznaczać.'],
['mogą zawierać tylko litery, cyfry oraz znaki unicode np. emoji',0,'Emoji nie są dozwolone w identyfikatorach. Dozwolone jest też podkreślenie _, więc „tylko litery i cyfry” jest zresztą błędne.'],
['nie mogą zaczynać się od liczby',1,'Identyfikator zaczyna się od litery lub _ (albo @ dla słowa kluczowego).']],
tip:'Pewne odpowiedzi: a i d. Opcja b jest pułapką – na teście ryzyko jej zaznaczenia nie jest warte, bo błąd zeruje całe pytanie.'});

add('db',{p:1,q:'Usunięcie wszystkich rekordów z tabeli bez usuwania samej tabeli możliwe jest za pomocą polecenia:',o:[
['DELETE',1,'<code>DELETE FROM tabela;</code> bez WHERE usuwa wszystkie wiersze, tabela zostaje.'],
['DROP',0,'DROP TABLE usuwa tabelę wraz ze strukturą.'],
['TRUNCATE',1,'<code>TRUNCATE TABLE</code> czyści wszystkie wiersze, zachowuje strukturę (szybciej niż DELETE).'],
['ALTER',0,'ALTER zmienia strukturę tabeli, nie usuwa danych.']],
tip:'Klasyczna pułapka: DELETE bez WHERE też czyści całą tabelę – więc poprawne są DELETE i TRUNCATE.'});

add('csharp',{p:1,q:'Czym różni się == od metody equals() w porównywaniu obiektów?',o:[
['== działa tylko z typami prymitywnymi',0,'Operator == działa też z obiektami (porównuje referencje), o ile typ go nie przeciąża.'],
['== sprawdza referencję obiektów, a .equals() ich wartości',1,'Domyślnie == sprawdza tożsamość (ten sam obiekt), a equals() – po nadpisaniu – równość logiczną.'],
['== sprawdza wartości, a .equals() referencje',0,'Odwrotnie niż w rzeczywistości.'],
['Oba sprawdzają to samo',0,'Domyślnie nie. Pokrywają się dopiero, gdy klasa przeciąża == tak, by porównywał wartości (np. string w C#).']],
tip:'Pytanie brzmi jak Java (equals() z małej litery). W C# analogicznie: == (często referencje, ale string/record przeciążają), Equals() (równość logiczna), ReferenceEquals() (tożsamość).'});

add('cyber',{p:1,q:'Który numer portu jest standardowo używany przez HTTPS (HTTP Secure) do zabezpieczania komunikacji?',o:[
['21',0,'FTP (sterowanie).'],
['443',1,'Standardowy port HTTPS (HTTP przez TLS).'],
['25',0,'SMTP – wysyłanie poczty.'],
['80',0,'Niezaszyfrowany HTTP.']],
tip:'80 = HTTP, 443 = HTTPS. Pełna tabelka portów jest w lekcji o TLS.'});
})();
