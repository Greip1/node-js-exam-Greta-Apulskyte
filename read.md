Grupės žmonių išlaidų kontroliavimo sistema.

Ši sistema leidžia registruotiems vartotojams prisijungti į atskiras grupes ir dalintis sąskaitomis.
Įsivaizduokite, kad keliaujate su draugais ir dažnai sąskaitas apmoka vienas žmogus. Vėliau tas žmogus nori atgauti iš jūsų pinigus , o Jūs jau pamiršote, už ką turėtume atsiskaityti. Ši sistema potencialiai turėtų išspręsti šią problemą, nes leis dalintis išlaidomis/sąskaitomis su pasirinkta grupe.

Ši sistema susidarys iš 3 dalių:
duomenų bazės,
serverio (back-end),
klientinės dalies (front-end).

Duomenų bazė turi 4 lenteles su skliausteliuose nurodytais stulpeliais:
users (id, full_name, email, password, reg_timestamp); - dalyviu lentele;
groups (id, name); - grupės saugomos šioje lenteleje. Į šią lentelę iškarto įvedam per phpMyAdmin ar bet kokiu jums patogiu būdu šiuos įrašus: “Trip to Spain”, “Going to Alps”, “Dinner in Belgium”, “Trip to Finland”, “New Years Party” (arba kažką panašaus jūsų nuožiūra);
bills (id, group_id, amount, description); - atskira lentele išlaidoms kuria susiesime su grupėmis;
accounts (id, group_id, user_id) <- ši lentelė skirta žinoti kokioms grupėms priklauso kiekvienas vartotojas.
Duomenų bazės pavyzdinis sql pridedamas **db.sql** faile.

Back-end'o paleidimas

$ npm install

$ npm start

Front-end'e rasite:

registracijos, logino, grupių bei sąskaitų puslapius.
Registruojantis reikės pilno vardo, el. pašto ir slaptažodžio.
Prisijungę galėsite matyti puslapį, kuriame bus visos jums priskirtos grupės, taip pat galėsite prisiskirti naują grupę, na, o jei turite neapmokėtų sąskaitų, galėsite sukurti ir visiškai naują grupę, prie kurios galės prisijungti prisijungę vartotojai.
Paspaudę ant grupės, lengvai galėsite patekti į sąskaitų puslapį, matysite bendras tos grupės sąskaitas bei galėsite įterpti naują.
