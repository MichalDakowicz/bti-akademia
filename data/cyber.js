BANK.cyber={name:'Cyberbezpieczeństwo',icon:'🛡️',color:'#c2410c',
intro:'Na BTI pytania z tej kategorii są praktyczne: jak zabezpieczać aplikacje, hasła i komunikację. Jak na rozmowie kwalifikacyjnej – ważne jest „dlaczego”, nie definicja z podręcznika.',
lessons:[
{h:'Trójkąt CIA i podstawowe pojęcia',html:`
<p>Wszystko w bezpieczeństwie sprowadza się do ochrony trzech własności danych:</p>
<figure class="diagram"><svg viewBox="0 0 620 230" width="620" role="img" aria-label="Trójkąt CIA">
<polygon points="310,18 70,200 550,200" fill="none" class="ln" style="stroke:var(--c)" stroke-width="2.5"/>
<g font-size="15"><rect class="bx" x="225" y="4" width="170" height="52" rx="10"/><text x="310" y="26" text-anchor="middle" font-weight="800">Poufność</text><text x="310" y="46" text-anchor="middle" class="t2" font-size="12">Confidentiality</text>
<rect class="bx" x="10" y="172" width="170" height="52" rx="10"/><text x="95" y="194" text-anchor="middle" font-weight="800">Integralność</text><text x="95" y="214" text-anchor="middle" class="t2" font-size="12">Integrity</text>
<rect class="bx" x="440" y="172" width="170" height="52" rx="10"/><text x="525" y="194" text-anchor="middle" font-weight="800">Dostępność</text><text x="525" y="214" text-anchor="middle" class="t2" font-size="12">Availability</text></g>
<g font-size="12" class="t2"><text x="310" y="110" text-anchor="middle">szyfrowanie, kontrola dostępu</text><text x="310" y="128" text-anchor="middle">→ nikt niepowołany nie czyta</text>
<text x="135" y="150" text-anchor="middle">hash, podpis, HMAC</text><text x="485" y="150" text-anchor="middle">backup, redundancja, anty-DDoS</text></g></svg><figcaption>Każdy atak narusza co najmniej jedną z trzech własności.</figcaption></figure>
<table><tr><th>Pojęcie</th><th>Znaczenie</th></tr>
<tr><td>Uwierzytelnianie (authentication)</td><td>Kim jesteś? (hasło, klucz, biometria)</td></tr>
<tr><td>Autoryzacja (authorization)</td><td>Co możesz robić? (uprawnienia, role)</td></tr>
<tr><td>Rozliczalność (accounting)</td><td>Co zrobiłeś? (logi audytowe)</td></tr>
<tr><td>Zasada najmniejszych uprawnień</td><td>Daj tylko tyle dostępu, ile trzeba do zadania</td></tr>
<tr><td>Defense in depth</td><td>Wiele warstw zabezpieczeń – awaria jednej nie wywraca całości</td></tr>
<tr><td>Zero Trust</td><td>„Nigdy nie ufaj, zawsze weryfikuj” – także w sieci wewnętrznej</td></tr></table>
<div class="callout tip">Trzy czynniki uwierzytelniania: <b>coś, co wiesz</b> (hasło), <b>coś, co masz</b> (klucz FIDO2, telefon z TOTP), <b>coś, czym jesteś</b> (odcisk palca). MFA = co najmniej dwa <i>różne</i> czynniki. Hasło + PIN to wciąż jeden czynnik.</div>`},
{h:'Szyfrowanie, hash, podpis – co do czego',html:`
<figure class="diagram"><svg viewBox="0 0 680 210" width="680" role="img" aria-label="Symetryczne vs asymetryczne">
<g font-size="14"><text x="170" y="22" text-anchor="middle" font-weight="800">Symetryczne (AES, ChaCha20)</text>
<rect class="bx" x="20" y="45" width="90" height="46" rx="8"/><text x="65" y="73" text-anchor="middle">tekst</text>
<rect class="bx" x="230" y="45" width="90" height="46" rx="8"/><text x="275" y="73" text-anchor="middle">szyfrogram</text>
<path class="ln" d="M110 68H228" marker-end="url(#a)"/><text x="170" y="62" text-anchor="middle" font-size="12" style="fill:#c2410c">🔑 ten sam klucz</text>
<text x="170" y="125" text-anchor="middle" class="t2" font-size="12">szybkie, ale trzeba bezpiecznie przekazać klucz</text>
<text x="510" y="22" text-anchor="middle" font-weight="800">Asymetryczne (RSA, ECC)</text>
<rect class="bx" x="360" y="45" width="90" height="46" rx="8"/><text x="405" y="73" text-anchor="middle">tekst</text>
<rect class="bx" x="570" y="45" width="90" height="46" rx="8"/><text x="615" y="73" text-anchor="middle">szyfrogram</text>
<path class="ln" d="M450 68H568" marker-end="url(#a)"/><text x="510" y="62" text-anchor="middle" font-size="12" style="fill:#c2410c">🔑 klucz publiczny</text>
<text x="510" y="112" text-anchor="middle" font-size="12" style="fill:#c2410c">odszyfrowanie: klucz prywatny</text>
<text x="510" y="130" text-anchor="middle" class="t2" font-size="12">wolniejsze, ale bez wymiany sekretu</text></g>
<rect class="bx" x="20" y="150" width="640" height="50" rx="10"/><text x="340" y="172" text-anchor="middle" font-size="13" font-weight="700">W praktyce (TLS): asymetrycznie uzgadniasz klucz sesji → dane lecą szybkim szyfrem symetrycznym.</text><text x="340" y="190" text-anchor="middle" font-size="12" class="t2">Podpis cyfrowy działa „odwrotnie”: podpisujesz kluczem prywatnym, każdy weryfikuje publicznym.</text>
<defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" fill="#6b665c"/></marker></defs></svg></figure>
<table><tr><th></th><th>Odwracalne?</th><th>Klucz?</th><th>Po co</th></tr>
<tr><td>Szyfrowanie</td><td>tak</td><td>tak</td><td>poufność</td></tr>
<tr><td>Hash (SHA-256)</td><td><b>nie</b></td><td>nie</td><td>integralność, odciski plików</td></tr>
<tr><td>HMAC</td><td>nie</td><td>tak (tajny)</td><td>integralność + autentyczność</td></tr>
<tr><td>Podpis cyfrowy</td><td>—</td><td>para kluczy</td><td>autentyczność, niezaprzeczalność</td></tr></table>
<div class="callout trap">Hash to <b>nie</b> szyfrowanie. Nie ma „odszyfrowania hasha”. Hasła przechowuje się jako wolny hash z solą (<b>bcrypt, scrypt, Argon2</b>), a nie jako SHA-256 ani MD5 (za szybkie → łamane brute-force miliardami prób na sekundę).</div>`},
{h:'HTTPS, TLS i porty',html:`
<figure class="diagram"><svg viewBox="0 0 640 300" width="640" role="img" aria-label="Uzgadnianie TLS">
<g font-size="14"><rect class="bx" x="40" y="10" width="140" height="36" rx="8"/><text x="110" y="34" text-anchor="middle" font-weight="700">Przeglądarka</text>
<rect class="bx" x="460" y="10" width="140" height="36" rx="8"/><text x="530" y="34" text-anchor="middle" font-weight="700">Serwer :443</text>
<path class="ln" d="M110 46V290M530 46V290" stroke-dasharray="4 4"/>
<path class="ln" d="M110 80H528" marker-end="url(#b)"/><text x="320" y="72" text-anchor="middle" font-size="13">1. ClientHello: wspierane szyfry, wersja TLS</text>
<path class="ln" d="M528 125H112" marker-end="url(#b)"/><text x="320" y="117" text-anchor="middle" font-size="13">2. ServerHello + certyfikat (klucz publiczny)</text>
<path class="ln" d="M110 168H528" marker-end="url(#b)"/><text x="320" y="160" text-anchor="middle" font-size="13">3. Weryfikacja certyfikatu u CA + wymiana kluczy</text>
<path class="ln" d="M528 210H112" marker-end="url(#b)"/><text x="320" y="202" text-anchor="middle" font-size="13">4. Finished: obie strony mają ten sam klucz sesji</text>
<path d="M110 255H528" stroke="#15803d" stroke-width="3" marker-end="url(#b)"/><path d="M528 275H112" stroke="#15803d" stroke-width="3" marker-end="url(#b)"/><text x="320" y="248" text-anchor="middle" font-size="13" font-weight="700" style="fill:#15803d">5. Zaszyfrowane dane HTTP (AES-GCM / ChaCha20)</text></g>
<defs><marker id="b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" fill="#6b665c"/></marker></defs></svg><figcaption>Certyfikat dowodzi tożsamości serwera (podpisany przez zaufane CA) – to ochrona przed man-in-the-middle.</figcaption></figure>
<table><tr><th>Usługa</th><th>Port</th><th>Usługa</th><th>Port</th></tr>
<tr><td>HTTP</td><td>80</td><td>SSH / SFTP</td><td>22</td></tr><tr><td><b>HTTPS</b></td><td><b>443</b></td><td>DNS</td><td>53</td></tr>
<tr><td>FTP</td><td>21</td><td>SMTP</td><td>25 (587 submission)</td></tr>
<tr><td>RDP</td><td>3389</td><td>MySQL / PostgreSQL</td><td>3306 / 5432</td></tr>
<tr><td>MS SQL</td><td>1433</td><td>Telnet (niezaszyfrowany!)</td><td>23</td></tr></table>`},
{h:'Ataki na aplikacje webowe (OWASP)',html:`
<table><tr><th>Atak</th><th>Co robi</th><th>Obrona</th></tr>
<tr><td><b>SQL Injection</b></td><td>Wstrzyknięcie SQL przez pole formularza, np. <code>' OR '1'='1</code></td><td><b>Zapytania parametryzowane</b>, ORM, minimalne uprawnienia konta DB</td></tr>
<tr><td><b>XSS</b></td><td>Wstrzyknięcie skryptu JS wykonującego się w przeglądarce ofiary (kradzież sesji, fałszowanie strony)</td><td>Kodowanie wyjścia (escaping), <b>CSP</b>, cookie <code>HttpOnly</code>, sanityzacja HTML</td></tr>
<tr><td><b>CSRF</b></td><td>Strona atakującego wysyła w twoim imieniu żądanie do serwisu, w którym jesteś zalogowany</td><td>Tokeny anty-CSRF, <code>SameSite</code> cookies, sprawdzanie Origin</td></tr>
<tr><td>Broken Access Control</td><td>Zmiana ID w URL i dostęp do cudzych danych (IDOR)</td><td>Autoryzacja po stronie serwera przy <i>każdym</i> żądaniu</td></tr>
<tr><td>MITM</td><td>Podsłuch lub modyfikacja ruchu</td><td>TLS + poprawna walidacja certyfikatu, HSTS</td></tr>
<tr><td>DDoS</td><td>Zalew żądań → brak dostępności</td><td>CDN, rate limiting, skalowanie, WAF</td></tr>
<tr><td>Phishing / socjotechnika</td><td>Podszywanie się, by wyłudzić dane</td><td>MFA (najlepiej FIDO2), szkolenia, filtrowanie poczty</td></tr></table>
<pre>-- Podatne: konkatenacja
query = "SELECT * FROM users WHERE name = '" + input + "'"
-- Dla input = ' OR '1'='1  powstaje:  ... WHERE name = '' OR '1'='1'   (zwraca wszystkich!)

-- Bezpieczne: parametr jest DANĄ, nigdy kodem SQL
cursor.execute("SELECT * FROM users WHERE name = %s", (input,))</pre>
<div class="callout trap">Szyfrowanie bazy ani HTTPS <b>nie chroni</b> przed SQL injection – atak dzieje się na poziomie logiki aplikacji, nie transportu. Tak samo „zmiana GET na POST” nie jest obroną przed XSS ani SQLi.</div>`},
{h:'Hasła, MFA, ransomware – praktyka',html:`
<ul>
<li><b>Sól (salt)</b> – losowy dodatek do hasła przed hashowaniem. Dwa identyczne hasła mają różne hashe → tablice tęczowe (rainbow tables) przestają działać.</li>
<li><b>Pepper</b> – sekretny dodatek trzymany poza bazą.</li>
<li><b>Ransomware</b> szyfruje dane i żąda okupu. Podstawowa obrona: <b>kopie zapasowe 3-2-1</b> (3 kopie, 2 różne nośniki, 1 poza siedzibą/offline) <i>i testy odtwarzania</i>.</li>
<li><b>Patchowanie</b> – większość ataków używa znanych, załatanych luk (CVE).</li>
<li><b>Segmentacja sieci, VLAN, firewall</b> – ograniczają ruch boczny po włamaniu.</li>
<li><b>SIEM / EDR / SOC</b> – wykrywanie i reagowanie na incydenty.</li>
<li>Pentest: <b>białoskrzynkowy</b> (znasz kod), <b>czarnoskrzynkowy</b> (nic nie wiesz).</li>
</ul>
<div class="callout tip">Przy pytaniu „która obrona jest najlepsza” szukaj tej, która usuwa <i>przyczynę</i> (np. parametryzacja zapytań), a nie tylko łagodzi skutki (WAF, logowanie).</div>`}
],
qs:[
{p:1,q:'Które z poniższych algorytmów są <b>symetryczne</b>?',o:[['AES',1,'Szyfr blokowy – jeden klucz do szyfrowania i odszyfrowania.'],['ChaCha20',1,'Szyfr strumieniowy, także jeden wspólny klucz (używany w TLS i WireGuard).'],['RSA',0,'Asymetryczny: klucz publiczny szyfruje, prywatny odszyfrowuje.'],['SHA-256',0,'To funkcja skrótu – nie szyfruje, więc nie jest ani symetryczna, ani asymetryczna.']],tip:'Symetryczne = jeden klucz (AES, ChaCha20, 3DES). Asymetryczne = para kluczy (RSA, ECC, Diffie-Hellman). Hash to osobna kategoria.'},
{p:3,q:'Które działania <b>skutecznie ograniczają ryzyko SQL Injection</b>?',o:[['Zapytania parametryzowane (prepared statements)',1,'Dane trafiają jako parametry, nigdy nie są interpretowane jako kod SQL. To rozwiązanie podstawowe.'],['Konto bazodanowe aplikacji z minimalnymi uprawnieniami',1,'Nie zapobiega wstrzyknięciu, ale ogranicza szkody (defense in depth): atakujący nie zrobi DROP TABLE.'],['Szyfrowanie całej bazy algorytmem AES',0,'Szyfrowanie „at rest” chroni dysk, a nie logikę zapytań. Aplikacja i tak odszyfrowuje dane dla atakującego.'],['Wymuszenie HTTPS na całej stronie',0,'HTTPS chroni transport. Złośliwy payload dociera do serwera tak samo, tylko zaszyfrowany.']],tip:'SQLi to błąd budowania zapytań, więc leczy go parametryzacja. Reszta to dodatkowe warstwy.'},
{p:1,q:'Jak <b>poprawnie</b> przechowywać hasła użytkowników w bazie?',o:[['Hash z solą wolnym algorytmem (bcrypt, Argon2)',1,'Sól unieważnia tablice tęczowe, a wolny hash utrudnia brute-force.'],['SHA-256 bez soli',0,'Zbyt szybki i bez soli: identyczne hasła mają identyczne hashe, łatwo łamane na GPU.'],['Zaszyfrowane AES-em, klucz w kodzie aplikacji',0,'Szyfrowanie jest odwracalne – wyciek klucza = wyciek wszystkich haseł.'],['Jawnym tekstem, ale baza za firewallem',0,'Pierwszy wyciek bazy odsłania wszystkie hasła, a użytkownicy używają ich też gdzie indziej.']],tip:'Hasła się hashuje, nie szyfruje. Serwer nie musi znać twojego hasła – tylko sprawdzić, czy hash pasuje.'},
{p:3,q:'Które mechanizmy chronią przed atakiem <b>XSS</b> (Cross-Site Scripting)?',o:[['Kodowanie (escaping) danych wstawianych do HTML',1,'Znak &lt; zamieniony na &amp;lt; nie uruchomi znacznika &lt;script&gt;.'],['Nagłówek Content-Security-Policy',1,'CSP ogranicza źródła skryptów – wstrzyknięty inline-script zostanie zablokowany.'],['Flaga HttpOnly na ciasteczku sesji',1,'Nie zatrzyma XSS, ale JavaScript nie odczyta ciasteczka, więc nie wyciągnie go do atakującego. Skrypt nadal może jednak działać w imieniu ofiary, więc to tylko jedna z warstw obrony.'],['Zamiana metody GET na POST w formularzu',0,'Metoda HTTP nie ma wpływu na to, czy odpowiedź zawiera nieescapowany skrypt.']],tip:'XSS = JS atakującego wykonuje się w kontekście strony ofiary. Broń: escaping wyjścia, CSP, HttpOnly.'},
{p:1,q:'Które mechanizmy wspierają <b>integralność</b> danych?',o:[['Podpis cyfrowy',1,'Zmiana choćby jednego bitu unieważnia podpis.'],['HMAC',1,'Skrót z tajnym kluczem – wykrywa modyfikację i potwierdza źródło.'],['Suma kontrolna / hash pliku',1,'Pozwala wykryć zmianę (lub uszkodzenie) pliku.'],['Ochrona przed DDoS',0,'To dotyczy dostępności, a nie niezmienności danych.']],tip:'Integralność = dane nie zostały zmienione bez zgody. Szyfrowanie samo w sobie (np. AES-CBC) jej nie gwarantuje, dlatego używa się trybów uwierzytelnianych jak AES-GCM.'},
{p:3,q:'Które z poniższych to czynnik uwierzytelniania „<b>coś, co posiadasz</b>”?',o:[['Klucz sprzętowy FIDO2 (np. YubiKey)',1,'Fizyczny token – musisz go mieć przy sobie.'],['Jednorazowy kod TOTP z aplikacji w telefonie',1,'Dowodzi posiadania urządzenia z zapisanym sekretem.'],['Hasło',0,'To „coś, co wiesz”.'],['Odcisk palca',0,'To „coś, czym jesteś” (biometria).']],tip:'Wiem / Mam / Jestem. Prawdziwe MFA łączy co najmniej dwie z trzech kategorii.'},
{p:1,q:'Które środki są skuteczną ochroną przed <b>CSRF</b>?',o:[['Token anty-CSRF w formularzach',1,'Atakujący z innej domeny nie zna tokena, więc nie sfałszuje żądania.'],['Ciasteczka z atrybutem SameSite=Lax/Strict',1,'Przeglądarka nie dołącza ciasteczka do żądań inicjowanych z obcych stron.'],['Hashowanie haseł bcryptem',0,'To chroni hasła w bazie, nie ma związku z podrabianiem żądań.'],['Używanie wyłącznie HTTP zamiast HTTPS',0,'To obniża bezpieczeństwo – nie jest żadną obroną.']],tip:'CSRF wykorzystuje to, że przeglądarka sama dołącza ciasteczka. Token lub SameSite przerywa ten mechanizm.'},
{p:3,q:'Które pary <b>usługa – domyślny port</b> są poprawne?',o:[['SSH – 22',1,'Secure Shell działa na TCP 22.'],['DNS – 53',1,'Zapytania na UDP 53 (TCP przy dużych odpowiedziach i transferze stref).'],['PostgreSQL – 5432',1,'Domyślny port PostgreSQL. MySQL to 3306.'],['HTTPS – 80',0,'80 to HTTP. HTTPS używa 443.']],tip:'Naucz się: 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 3389 RDP, 5432 PostgreSQL.'},
{p:1,q:'Które działania realnie zmniejszają <b>skutki ataku ransomware</b>?',o:[['Offline/niezmienialne kopie zapasowe',1,'Ransomware nie zaszyfruje kopii, do których nie ma dostępu z zainfekowanej sieci.'],['Regularne testy odtwarzania z backupu',1,'Backup, którego nie da się odtworzyć, jest bezwartościowy – odkrywasz to dopiero w kryzysie.'],['Zapłacenie okupu od razu',0,'Nie ma gwarancji odzyskania danych, finansuje przestępców i oznacza cię jako płacącego.'],['Samo zainstalowanie antywirusa i brak backupu',0,'Antywirus nie wykrywa wszystkiego; bez kopii pojedyncza infekcja = utrata danych.']],tip:'Zasada 3-2-1: 3 kopie, 2 nośniki, 1 poza siedzibą (najlepiej offline).'},
{p:3,q:'Co potwierdza <b>certyfikat TLS</b> przedstawiony przez serwer?',o:[['Że klucz publiczny należy do domeny, do której się łączysz',1,'Certyfikat wiąże domenę z kluczem publicznym; podpisuje go urząd certyfikacji (CA).'],['Że przeglądarka ufa wystawcy (CA) z własnego magazynu zaufanych',1,'Przeglądarka weryfikuje łańcuch certyfikatów do zaufanego głównego CA.'],['Że strona jest wolna od złośliwego oprogramowania',0,'Certyfikat nie mówi nic o treści strony. Phishingowe witryny też mają „kłódkę”.'],['Że serwer nigdy nie zostanie zhakowany',0,'To tylko tożsamość i szyfrowanie transportu – nie ocena bezpieczeństwa serwera.']],tip:'„Kłódka” = rozmowa jest szyfrowana i rozmawiasz z właścicielem tej domeny. Nie znaczy, że domena jest uczciwa.'}
]};
