const fs = require('fs');
const path = require('path');
const ncp = require('node-clipboardy');

const mappedFiles = [
  { guid: 'TLljjPrjAq', url: '/assets/game/dyes/Feast_yetigoggles.jpg' },
  { guid: 'IKrJLeNVIL', url: '/assets/game/dyes/Remembrance_ultsash.jpg' },
  { guid: 'UMv2RWtO9g', url: '/assets/game/dyes/mask/2slots_Base_mask.jpg' },
  { guid: 'Htee_duioI', url: '/assets/game/dyes/mask/Dreams_peek2.jpg' },
  { guid: 'HgkvwqNp19', url: '/assets/game/dyes/mask/Dreams_ult.jpg' },
  { guid: 'Em7ZxGZAN5', url: '/assets/game/dyes/mask/Base_default.jpg'},
  { guid: 'AImwzhXmNV', url: '/assets/game/dyes/cape/Base_moth.jpg'},
  { guid: 'wUPw1TRQSI', url: '/assets/game/dyes/outfit/Bloom_gardener.jpg'},
  { guid: 'gnC7YQCAug', url: '/assets/game/dyes/cape/Feast_SnowflakeCape.jpg'},
  { guid: 'GoESQXsRjl', url: '/assets/game/dyes/cape/Feast_santa.jpg'},
  { guid: 'B3YJxxJKJX', url: '/assets/game/dyes/cape/Feast_WinterAncestorCape.jpg'},
  { guid: 'Nep9ocMylo', url: '/assets/game/dyes/cape/Feast_YetiCape.jpg'},
  { guid: 'quSFDuWUoV', url: '/assets/game/dyes/cape/Feast_peek.jpg'},
  { guid: 'hLJjrHH-Ag', url: '/assets/game/dyes/mask/Fortune_bull.jpg'},
  { guid: 'HnCWgj7aoA', url: '/assets/game/dyes/mask/Fortune_blush.jpg'},
  { guid: 'c1YroXxA9Z', url: '/assets/game/dyes/mask/Fortune_tiger.jpg'},
  { guid: 'ADJiva5H2Z', url: '/assets/game/dyes/outfit/Fortune_muralist.jpg'},
  { guid: 'D_k9C9QybE', url: '/assets/game/dyes/mask/Fortune_rabbit.jpg'},
  { guid: 'wkCxoe9zSP', url: '/assets/game/dyes/outfit/Fortune_dragon.jpg'},
  { guid: 'LGaX4cqdOe', url: '/assets/game/dyes/cape/Fortune_DragonCape.jpg'},
  { guid: 'OFwVuPWmfK', url: '/assets/game/dyes/mask/Fortune_dragon.jpg'},
  { guid: '293EzlKBBS', url: '/assets/game/dyes/cape/Fortune_SnekCape.jpg'},
  { guid: 'ZmPfYe6tPD', url: '/assets/game/dyes/outfit/Fortune_Snake.jpg'},
  { guid: 'OVAIVV5-Q6', url: '/assets/game/dyes/mask/Fortune_snake.jpg'},
  { guid: 'rFRaOxnvXF', url: '/assets/game/dyes/mask/Love_rose.jpg'},
  { guid: '4D33RG4tNB', url: '/assets/game/dyes/cape/Mischief_BatCape.jpg'},
  { guid: 'gEGMIX0DMp', url: '/assets/game/dyes/cape/Mischief_SpiderCape.jpg'},
  { guid: 'CZ4aNN-JZV', url: '/assets/game/dyes/outfit/Mischief_Witch.jpg'},
  { guid: 'QeNQhxg3mv', url: '/assets/game/dyes/mask/Mischief_cat.jpg'},
  { guid: 'pG1_D61KMT', url: '/assets/game/dyes/cape/Mischief_cat.jpg'},
  { guid: 'txwX8D1yKh', url: '/assets/game/dyes/cape/Mischef_crabulacape.webp'},
  { guid: 'p-lbmuULv5', url: '/assets/game/dyes/outfit/Mischief_Goth.jpg'},
  { guid: '2e97D5cOuG', url: '/assets/game/dyes/outfit/Moonlight_robe.jpg'},
  { guid: 'XCTyx0K4zm', url: '/assets/game/dyes/cape/Music_cape.jpg'},
  { guid: 'n6S9sKtNlW', url: '/assets/game/dyes/outfit/Music_pants.jpg'},
  { guid: 'MjA9EoD-pe', url: '/assets/game/dyes/cape/Nature_ocean.jpg'},
  { guid: 'YzpV97Kbgp', url: '/assets/game/dyes/mask/Nature_river.jpg'},
  { guid: '0rrPORrk7O', url: '/assets/game/dyes/outfit/Color_GaySuspenders.jpg'},
  { guid: '9ETwx3n-UZ', url: '/assets/game/dyes/outfit/Color_DarkRainbowTunic.jpg'},
  { guid: '2OuY3ABFCZ', url: '/assets/game/dyes/cape/Color_DarkRainbowCape.jpg'},
  { guid: 'NdTO2GQkMc', url: '/assets/game/dyes/mask/Colour_mask.jpg'},
  { guid: 'E7RAu04_xI', url: '/assets/game/dyes/outfit/Style_jeans.jpg'},
  { guid: 'TbSEPp5DAI', url: '/assets/game/dyes/mask/Style_sparkle.jpg'},
  { guid: 'WEGS4Ul0qq', url: '/assets/game/dyes/outfit/Style_dress.jpg'},
  { guid: '4c-yCAGV5U', url: '/assets/game/dyes/outfit/Style_suit.jpg'},
  { guid: 'vNSMly5D9b', url: '/assets/game/dyes/cape/Sunlight_manta.jpg'},
  { guid: '_DzSz5REUk', url: '/assets/game/dyes/outfit/Sunlight_dadpants.jpg'},
  { guid: 'Q0SG-Lg3_w', url: '/assets/game/dyes/outfit/Tournament_tunic.jpg'},
  { guid: 'gLeirt4C--', url: '/assets/game/dyes/mask/Base_chibi.jpg'},
  { guid: '7Mh9pQzRHj', url: '/assets/game/dyes/cape/Base_teal.jpg'},
  { guid: 'gwRIgeL-d2', url: '/assets/game/dyes/cape/Base_teal2.jpg'},
  { guid: 'PIu602lYaG', url: '/assets/game/dyes/cape/Base_purple.jpg'},
  { guid: 'mo8clKxyAN', url: '/assets/game/dyes/cape/Base_purple2.jpg'},
  { guid: 'eZMt8EziXY', url: '/assets/game/dyes/cape/Base_yellow.jpg'},
  { guid: '9YJ5i3uu4Z', url: '/assets/game/dyes/cape/Base_yellow2.jpg'},
  { guid: 'UMv2RWtO9g', url: '/assets/game/dyes/mask/Base_mask.jpg'},
  { guid: 'RvpMLaVQSd', url: '/assets/game/dyes/cape/Base_pink.jpg'},
  { guid: 'vscrkSHo4p', url: '/assets/game/dyes/cape/Base_pink2.jpg'},
  { guid: 'o104MA8jIE', url: '/assets/game/dyes/cape/Base_red.jpg'},
  { guid: '4iqOdYFTuk', url: '/assets/game/dyes/cape/Base_red2.jpg'},
  { guid: 'ec8jU3Gerw', url: '/assets/game/dyes/cape/Base_white.jpg'},
  { guid: 'fRVPpavon7', url: '/assets/game/dyes/cape/Base_white2.jpg'},
  { guid: 'WwlWwMfCen', url: '/assets/game/dyes/cape/Base_blue.jpg'},
  { guid: 'DyXPylwH7w', url: '/assets/game/dyes/cape/Base_blue2.jpg'},
  { guid: '3lA6dG5lJz', url: '/assets/game/dyes/cape/Base_green.jpg'},
  { guid: 'ggrTorky-R', url: '/assets/game/dyes/cape/Base_green2.jpg'},
  { guid: 'NDJlGR97m-', url: '/assets/game/dyes/cape/Base_black.jpg'},
  { guid: 'ya7BleEI6V', url: '/assets/game/dyes/cape/Base_black2.jpg'},
  { guid: '8Oy0j-LGR_', url: '/assets/game/dyes/cape/Abyss_ult.jpg'},
  { guid: 'zYUN2fkYOQ', url: '/assets/game/dyes/mask/Abyss_ult.jpg'},
  { guid: 'P2xV7cdviC', url: '/assets/game/dyes/mask/Abyss_f2p.jpg'},
  { guid: 'Q0E7lpa192', url: '/assets/game/dyes/cape/Abyss_AnglerCape.jpg'},
  { guid: 'xCPJYG39hD', url: '/assets/game/dyes/outfit/Abyss_angler.jpg'},
  { guid: 'aoo9OjQKpZ', url: '/assets/game/dyes/mask/Abyss_Cease.jpg'},
  { guid: '_qGl7VRl35', url: '/assets/game/dyes/cape/Abyss_cease.jpg'},
  { guid: 'nv2UT24TMx', url: '/assets/game/dyes/cape/Abyss_boat.jpg'},
  { guid: 'J4wT0OrTrf', url: '/assets/game/dyes/cape/Abyss_CannoneerCape.jpg'},
  { guid: 'bOx0bcbPix', url: '/assets/game/dyes/mask/Assembly_ult.jpg'},
  { guid: 'ZdKPdWs2xL', url: '/assets/game/dyes/cape/Assembly_ult.jpg'},
  { guid: 'JQSXDCKUPE', url: '/assets/game/dyes/mask/Assembly_botanist.jpg'},
  { guid: 'WKIqwWYgD9', url: '/assets/game/dyes/mask/Assembly_student.jpg'},
  { guid: 'mF5qoEBPBj', url: '/assets/game/dyes/cape/Assembly_student.jpg'},
  { guid: '-02LBs9S2V', url: '/assets/game/dyes/mask/Assembly_cadet.jpg'},
  { guid: 'NJXnW8a4Rq', url: '/assets/game/dyes/mask/Assembly_march.jpg'},
  { guid: '6QmWZYs5KC', url: '/assets/game/dyes/mask/Assembly_chuckle.jpg'},
  { guid: 'VToGfUfrj1', url: '/assets/game/dyes/outfit/Assembly_chuckle.jpg'},
  { guid: 'qoLywJXaJA', url: '/assets/game/dyes/mask/Assembly_daydream.jpg'},
  { guid: '86vG43eb7E', url: '/assets/game/dyes/cape/Belonging_CousinCape.jpg'},
  { guid: 'qrP9vZPLlk', url: '/assets/game/dyes/outfit/Belonging_kid.jpg'},
  { guid: 'WCPTi8XYZy', url: '/assets/game/dyes/cape/Belonging_GrandpaCape.jpg'},
  { guid: 'mH0YjUsODC', url: '/assets/game/dyes/cape/Belonging_PleafulCape.jpg'},
  { guid: 'HgkvwqNp19', url: '/assets/game/dyes/mask/Dreams_ult2.jpg'},
  { guid: 'w1EkwcgG88', url: '/assets/game/dyes/cape/Dreams_ult.jpg'},
  { guid: 'n4sSWlUIbO', url: '/assets/game/dyes/outfit/Dreams_Yeti.jpg'},
  { guid: '4Hk-52OgPb', url: '/assets/game/dyes/mask/Dreams_DP.jpg'},
  { guid: 'hmWCBGAmfU', url: '/assets/game/dyes/cape/Dreams_DP.jpg'},
  { guid: 'xFj09irsLt', url: '/assets/game/dyes/outfit/Dreams_peek.jpg'},
  { guid: 'hPlYrRFFLa', url: '/assets/game/dyes/cape/Dreams_peek.jpg'},
  { guid: 'Htee_duioI', url: '/assets/game/dyes/mask/Dreams_peek.jpg'},
  { guid: 'V5TIjYorQs', url: '/assets/game/dyes/mask/Dreams_quail.jpg'},
  { guid: 'oyvK6kO527', url: '/assets/game/dyes/cape/Dreams_spin.jpg'},
  { guid: 'bOUW5LY8PU', url: '/assets/game/dyes/cape/Duets_pianist.jpg'},
  { guid: 'diBkeTRe1G', url: '/assets/game/dyes/mask/Duets_seahorse.jpg'},
  { guid: 'tMT9whKoLk', url: '/assets/game/dyes/outfit/Duets_Pianist1.jpg'},
  { guid: 'WTVL4L3IT-', url: '/assets/game/dyes/outfit/Duets_Cellist1.jpg'},
  { guid: 'tPukMxWUyv', url: '/assets/game/dyes/outfit/Duets_Cellist2.jpg'},
  { guid: 'NN66BKlRfk', url: '/assets/game/dyes/cape/Duets_cellist.jpg'},
  { guid: 'svs-TcEdo-', url: '/assets/game/dyes/outfit/Duets_Pianist2.jpg'},
  { guid: 'GyXhQOu4fZ', url: '/assets/game/dyes/mask/Enchantment_muralist.jpg'},
  { guid: 'ipSfkZ8Rql', url: '/assets/game/dyes/cape/Enchantment_alchemist.jpg'},
  { guid: 'FyM7E9zFoH', url: '/assets/game/dyes/cape/Enchantment_crabwalk.jpg'},
  { guid: 'r1UK3P6AGy', url: '/assets/game/dyes/mask/Enchantment_scarecrow.jpg'},
  { guid: '9KhfuEDkFe', url: '/assets/game/dyes/cape/Enchantment_snooze.jpg'},
  { guid: 'y37rCd0HV4', url: '/assets/game/dyes/mask/Enchantment_playfight.jpg'},
  { guid: 'RBXxOaKIyg', url: '/assets/game/dyes/cape/Enchantment_playfight.jpg'},
  { guid: 'SxX0bNDJaR', url: '/assets/game/dyes/outfit/Flight_ult.jpg'},
  { guid: 'UjA8CZwZ9i', url: '/assets/game/dyes/cape/Flight_NaviCape.jpg'},
  { guid: '1IwU-ZZu1g', url: '/assets/game/dyes/cape/Flight_LWCape.jpg'},
  { guid: 'Y7j3ljNdYp', url: '/assets/game/dyes/outfit/Flight_LW.jpg'},
  { guid: '5Z5JqDkAtl', url: '/assets/game/dyes/outfit/Flight_chime.jpg'},
  { guid: 'g-vZeE8cmg', url: '/assets/game/dyes/outfit/Flight_Builder.jpg'},
  { guid: 'kHq2VDev2Y', url: '/assets/game/dyes/mask/Gratitude_ult.webp'},
  { guid: 'xROh6OVPnJ', url: '/assets/game/dyes/mask/Gratitude_Sassy.jpg'},
  { guid: 'k9UvQv3vi0', url: '/assets/game/dyes/cape/Gratitude_yoga.jpg'},
  { guid: 'wSjNwu664c', url: '/assets/game/dyes/mask/Gratitude_Provoke.jpg'},
  { guid: 'RX-66s3KFD', url: '/assets/game/dyes/mask/Gratitude_Leap.jpg'},
  { guid: '7WktQVTwtR', url: '/assets/game/dyes/cape/Gratitude_dismiss.jpg'},
  { guid: 'XOhMscNvdq', url: '/assets/game/dyes/mask/Gratitude_dismiss.jpg'},
  { guid: 'O_E6Y4gBQ8', url: '/assets/game/dyes/mask/Gratitude_Shaman.jpg'},
  { guid: 'lw79vLwEkP', url: '/assets/game/dyes/mask/Lightseeker_piggyback.jpg'},
  { guid: 'ILUnt_OrWQ', url: '/assets/game/dyes/cape/Lightseeker_piggyback.jpg'},
  { guid: 'lz89xViG6m', url: '/assets/game/dyes/mask/Lightseeker_doublefive.jpg'},
  { guid: 'rj8Dzz64e9', url: '/assets/game/dyes/mask/Lightseeker_laidback.jpg'},
  { guid: '0L89TCDEtN', url: '/assets/game/dyes/mask/Lightseeker_Twirl.jpg'},
  { guid: 'wTgGX3U9yp', url: '/assets/game/dyes/mask/Lightseeker_crab.jpg'},
  { guid: 'dotE5ejKYP', url: '/assets/game/dyes/cape/Lightseeker_CrabCallCape.jpg'},
  { guid: 'rGAnOKoXlu', url: '/assets/game/dyes/mask/Lightseeker_SLS.jpg'},
  { guid: 'bj5HUEsP0R', url: '/assets/game/dyes/cape/Lightseeker_SLS.jpg'},
  { guid: '3m-6xEWbtg', url: '/assets/game/dyes/mask/Moments_ranger.jpg'},
  { guid: 'JSnhIHtrE5', url: '/assets/game/dyes/cape/Moments_RangerCape.jpg'},
  { guid: 'aU8YW34Cau', url: '/assets/game/dyes/mask/Moments_blindfold.jpg'},
  { guid: '6OKxFB9NFg', url: '/assets/game/dyes/outfit/Moments_monk.jpg'},
  { guid: 'InwVEtmmcp', url: '/assets/game/dyes/outfit/Moments_Nightbird.jpg'},
  { guid: 'yN19ZpyYJH', url: '/assets/game/dyes/outfit/Nesting_ult.jpg'},
  { guid: 'zhugp6XAdZ', url: '/assets/game/dyes/cape/Nesting_cape.jpg'},
  { guid: 'kA-N6gBSIG', url: '/assets/game/dyes/mask/Passage_serow.jpg'},
  { guid: 'oM9Xecb_kS', url: '/assets/game/dyes/mask/Passage_boar.jpg'},
  { guid: 'zozW0cQQhx', url: '/assets/game/dyes/mask/Passage_monke.jpg'},
  { guid: '9mhT-2bV4K', url: '/assets/game/dyes/mask/Passage_racooon.jpg'},
  { guid: '8Kf_oq9FWL', url: '/assets/game/dyes/mask/Passage_guidebear.jpg'},
  { guid: 'Py6sIw6EvE', url: '/assets/game/dyes/outfit/Passage_Oddball.jpg'},
  { guid: 'mfA3I1hs5x', url: '/assets/game/dyes/cape/Passage_RacoonCape.jpg'},
  { guid: 'aaYJbWm6oV', url: '/assets/game/dyes/outfit/Passage_Mope.jpg'},
  { guid: 'GaLyg5WMaC', url: '/assets/game/dyes/cape/Passage_CoatCape.jpg'},
  { guid: 'DBRlaSaues', url: '/assets/game/dyes/mask/Performance_ult.jpg'},
  { guid: 'sYYg6rFPj6', url: '/assets/game/dyes/cape/Performance_ult.jpg'},
  { guid: 'xoEQI_2ykm', url: '/assets/game/dyes/outfit/Performance_stagehand.jpg'},
  { guid: 'no0xArAFGq', url: '/assets/game/dyes/outfit/Performance_storyteller.jpg'},
  { guid: 'KoLgRv-HIL', url: '/assets/game/dyes/cape/Performance_storyteller.jpg'},
  { guid: 'q0yCSOGypV', url: '/assets/game/dyes/cape/Performance_mellow.jpg'},
  { guid: 'DFn3TnXyGw', url: '/assets/game/dyes/outfit/Performance_modest.jpg'},
  { guid: 'GYWFafVVd_', url: ' /assets/game/dyes/mask/Prophecy_ultmask.webp'},
  { guid: 'OMRQQpGTCh', url: '/assets/game/dyes/cape/Prophecy_TurtleCape.jpg'},
  { guid: 'Gu5Pw8cvcR', url: '/assets/game/dyes/mask/Prophecy_turtle.jpg'},
  { guid: 'K1EZHVX9Sb', url: '/assets/game/dyes/cape/Prophecy_SpiderCape.jpg'},
  { guid: 'JTPr5NiPEz', url: '/assets/game/dyes/mask/Prophecy_spider.jpg'},
  { guid: '3j1vIMlhqg', url: '/assets/game/dyes/mask/Prophecy_bat.jpg'},
  { guid: 'mfNUas_ov2', url: '/assets/game/dyes/cape/Prophecy_BatCape.jpg'},
  { guid: 'LMQrrhg9E8', url: '/assets/game/dyes/mask/Prophecy_lion.jpg'},
  { guid: 'V9HhQcek_9', url: '/assets/game/dyes/outfit/Prophecy_fire.jpg'},
  { guid: 'sGfjk16HcV', url: '/assets/game/dyes/outfit/Radiance_Leap.jpg'},
  { guid: 'IhE0tBOPPO', url: '/assets/game/dyes/shoes/Radiance_Leaping.jpg'},
  { guid: 'Li5WaWrfs8', url: '/assets/game/dyes/cape/Radiance_fork.jpg'},
  { guid: 'St7IlVNQvN', url: '/assets/game/dyes/outfit/Radiance_Provoke.jpg'},
  { guid: 'sQ83oxC51R', url: '/assets/game/dyes/shoes/Radiance_Provoking.jpg'},
  { guid: 'InHKlMA2mI', url: '/assets/game/dyes/head-accessory/Radiance_Provoking.jpg'},
  { guid: 'EpgewHD2PP', url: '/assets/game/dyes/cape/Radiance_X.jpg'},
  { guid: 'vXeFHcV4TF', url: '/assets/game/dyes/outfit/Radiance_Shaman.jpg'},
  { guid: '5fUF9wGrq6', url: '/assets/game/dyes/hair/Radiance_Greeting.jpg'},
  { guid: 'g845DuQ_3R', url: '/assets/game/dyes/hair-accessory/Radiance_Greeting.jpg'},
  { guid: 'uSSYbcdA1j', url: '/assets/game/dyes/mask/Radiance_ult.jpg'},
  { guid: '-7DilSTRJc', url: '/assets/game/dyes/cape/Radiance_ult.jpg'},
  { guid: 'EzIn2w-a7F', url: '/assets/game/dyes/cape/Radiance_star.jpg'},
  { guid: 'woyw0Ddh2s', url: '/assets/game/dyes/mask/Remembrance_Veteran.jpg'},
  { guid: 'aVXNBBz0Qs', url: '/assets/game/dyes/cape/Remembrance_vet.jpg'},
  { guid: 'eP_tdKr4R7', url: '/assets/game/dyes/outfit/Remembrance_child.jpg'},
  { guid: '4tYFGTPkMo', url: '/assets/game/dyes/outfit/Remembrance_tiptoe.jpg'},
  { guid: 'XimZaRVH06', url: '/assets/game/dyes/cape/Remembrance_tiptoe.jpg'},
  { guid: 'XPEhyUKiiy', url: '/assets/game/dyes/outfit/Remembrance_warrior.jpg'},
  { guid: 'IA0nV9vsgZ', url: '/assets/game/dyes/cape/Remembrance_WarriorCape.jpg'},
  { guid: 'oVI6Qp4U_2', url: '/assets/game/dyes/cape/Revival_RhythmCape.jpg'},
  { guid: '0RcW7pTxDH', url: '/assets/game/dyes/cape/Revival_AbyssCape.jpg'},
  { guid: 'bXIUFu8eZ3', url: '/assets/game/dyes/cape/Revival_GratCape.jpg'},
  { guid: 'BudEUoZ6ZC', url: '/assets/game/dyes/cape/Revival_EnchantCape.jpg'},
  { guid: 'T4suf1MdTj', url: '/assets/game/dyes/outfit/Rhythm_Greeter.jpg'},
  { guid: 'kmgKsVBs4o', url: '/assets/game/dyes/outfit/Rhythm_Spin.jpg'},
  { guid: 'uMURxUHDKr', url: '/assets/game/dyes/outfit/Rhythm_Actor.jpg'},
  { guid: 'MIKr5rkFuk', url: '/assets/game/dyes/cape/Rhythm_juggler.jpg'},
  { guid: '52NbrdHrAf', url: '/assets/game/dyes/outfit/Rhythm_Juggler.jpg'},
  { guid: '6PJ8TATvNk', url: '/assets/game/dyes/outfit/Sanctuary_jelly.jpg'},
  { guid: 'NrFOa0B40l', url: '/assets/game/dyes/cape/Sanctuary_TimidCape.jpg'},
  { guid: 'ygwSSn-NvK', url: '/assets/game/dyes/cape/Sanctuary_shell.jpg'},
  { guid: 'QdmHwCR2Wk', url: '/assets/game/dyes/cape/Sanctuary_chill.jpg'},
  { guid: 'c0_xJdJKvM', url: '/assets/game/dyes/Feast_scarf.jpg'},
  { guid: '5wLqxZqnGM', url: '/assets/game/dyes/Mischief_sticker.jpg'},
  { guid: 'DS5QeApzvs', url: '/assets/game/dyes/Moments_ultglasses.jpg'},
  { guid: 'BkptA-MKN8', url: '/assets/game/dyes/Nature_Riverscarf.jpg'},
  { guid: 'KZ6aQtgCqt', url: '/assets/game/dyes/Nature_shellnecklace.jpg'},
  { guid: '-uVJsYJF-Z', url: '/assets/game/dyes/Remembrance_childscarf.jpg'},
  { guid: 'bBQbGQh1PU', url: '/assets/game/dyes/hair-accessory/Belonging_earmuffs.jpg'},
  { guid: 'dkLuIrNJyl', url: '/assets/game/dyes/hair-accessory/Flight_chimefeather.jpg'},
  { guid: 'DeouBCkpib', url: '/assets/game/dyes/hair-accessory/Flight_navifeathers.jpg'},
  { guid: 'cbWKMsAh7H', url: '/assets/game/dyes/hair-accessory/Flight_ultfeathers.jpg'},
  { guid: 'OjSfpOgFoR', url: '/assets/game/dyes/hair-accessory/Fortune_fish.jpg'},
  { guid: 'VBR5HI2-dU', url: '/assets/game/dyes/hair-accessory/Love_flowercrown.jpg'},
  { guid: 'ldRJqNu7QX', url: '/assets/game/dyes/hair-accessory/Moments_rangerhat.jpg'},
  { guid: 'nBg1iBLlGM', url: '/assets/game/dyes/hair-accessory/Moments_ulthat.jpg'},
  { guid: '7i6ro485Ra', url: '/assets/game/dyes/hair-accessory/Nesting_pencil.jpg'},
  { guid: 'O3iQEnpoV5', url: '/assets/game/dyes/hair-accessory/Revival_bow.jpg'},
  { guid: 'V7FLu_Hn4y', url: '/assets/game/dyes/hair-accessory/Sanctuary_chillhat.jpg'},
  { guid: 'o4cIshT_hD', url: '/assets/game/dyes/hair-accessory/Style_tophat.jpg'},
  { guid: 'DJBQZOapq3', url: '/assets/game/dyes/hair-accessory/Style_veil.jpg'},
  { guid: 'E_yfCZYU5C', url: '/assets/game/dyes/hair-accessory/Sunlight_hat.jpg'},
  { guid: 'xI0_ep59HH', url: '/assets/game/dyes/head-accessory/Dreams_yetihorns.jpg'},
  { guid: 'FlOSNmw_38', url: '/assets/game/dyes/head-accessory/Enchantment_ulttassels.jpg'},
  { guid: 'rQQmknOn9a', url: '/assets/game/dyes/head-accessory/Feast_antlers.jpg'},
  { guid: 'xsTxIqIX8E', url: '/assets/game/dyes/head-accessory/Fortune_dragonearrings.jpg'},
  { guid: 'Gz6U0Ahkg5', url: '/assets/game/dyes/head-accessory/Passage_tassels.jpg'},
  { guid: 'v6ZqvI6A_L', url: '/assets/game/dyes/head-accessory/Revival_earrings.jpg'},
  { guid: 'TLljjPrjAq', url: '/assets/game/dyes/2slots_Feast_yetigoggles.jpg'},
  { guid: 'IKrJLeNVIL', url: '/assets/game/dyes/2slots_Remembrance_ultsash.jpg'},
  { guid: 'J4wT0OrTrf', url: '/assets/game/dyes/cape/2slots_Abyss_CannoneerCape.jpg'},
  { guid: 'nv2UT24TMx', url: '/assets/game/dyes/cape/2slots_Abyss_boat.jpg'},
  { guid: '8Oy0j-LGR_', url: '/assets/game/dyes/cape/2slots_Abyss_ult.jpg'},
  { guid: '86vG43eb7E', url: '/assets/game/dyes/cape/2slots_Belonging_CousinCape.jpg'},
  { guid: 'WCPTi8XYZy', url: '/assets/game/dyes/cape/2slots_Belonging_GrandpaCape.jpg'},
  { guid: 'mH0YjUsODC', url: '/assets/game/dyes/cape/2slots_Belonging_PleafulCape.jpg'},
  { guid: '2OuY3ABFCZ', url: '/assets/game/dyes/cape/2slots_Color_DarkRainbowCape.jpg'},
  { guid: 'NN66BKlRfk', url: '/assets/game/dyes/cape/2slots_Duets_cellist.jpg'},
  { guid: 'bOUW5LY8PU', url: '/assets/game/dyes/cape/2slots_Duets_pianist.jpg'},
  { guid: 'ipSfkZ8Rql', url: '/assets/game/dyes/cape/2slots_Enchantment_alchemist.jpg'},
  { guid: 'RBXxOaKIyg', url: '/assets/game/dyes/cape/2slots_Enchantment_playfight.jpg'},
  { guid: '9KhfuEDkFe', url: '/assets/game/dyes/cape/2slots_Enchantment_snooze.jpg'},
  { guid: 'B3YJxxJKJX', url: '/assets/game/dyes/cape/2slots_Feast_WinterAncestorCape.jpg'},
  { guid: 'Nep9ocMylo', url: '/assets/game/dyes/cape/2slots_Feast_YetiCape.jpg'},
  { guid: 'UjA8CZwZ9i', url: '/assets/game/dyes/cape/2slots_Flight_NaviCape.jpg'},
  { guid: '293EzlKBBS', url: '/assets/game/dyes/cape/2slots_Fortune_SnekCape.jpg'},
  { guid: '7WktQVTwtR', url: '/assets/game/dyes/cape/2slots_Gratitude_dismiss.jpg'},
  { guid: 'bj5HUEsP0R', url: '/assets/game/dyes/cape/2slots_Lightseeker_SLS.jpg'},
  { guid: 'ILUnt_OrWQ', url: '/assets/game/dyes/cape/2slots_Lightseeker_piggyback.jpg'},
  { guid: 'JSnhIHtrE5', url: '/assets/game/dyes/cape/2slots_Moments_RangerCape.jpg'},
  { guid: 'zhugp6XAdZ', url: '/assets/game/dyes/cape/2slots_Nesting_cape.jpg'},
  { guid: 'GaLyg5WMaC', url: '/assets/game/dyes/cape/2slots_Passage_CoatCape.jpg'},
  { guid: 'KoLgRv-HIL', url: '/assets/game/dyes/cape/2slots_Performance_storyteller.jpg'},
  { guid: 'mfNUas_ov2', url: '/assets/game/dyes/cape/2slots_Prophecy_BatCape.jpg'},
  { guid: 'K1EZHVX9Sb', url: '/assets/game/dyes/cape/2slots_Prophecy_SpiderCape.jpg'},
  { guid: 'EpgewHD2PP', url: '/assets/game/dyes/cape/2slots_Radiance_X.jpg'},
  { guid: 'Li5WaWrfs8', url: '/assets/game/dyes/cape/2slots_Radiance_fork.jpg'},
  { guid: 'EzIn2w-a7F', url: '/assets/game/dyes/cape/2slots_Radiance_star.jpg'},
  { guid: '7WktQVTwtR', url: '/assets/game/dyes/cape/2slots_Gratitude_dismiss.jpg'},
  { guid: 'bj5HUEsP0R', url: '/assets/game/dyes/cape/2slots_Lightseeker_SLS.jpg'},
  { guid: 'ILUnt_OrWQ', url: '/assets/game/dyes/cape/2slots_Lightseeker_piggyback.jpg'},
  { guid: 'JSnhIHtrE5', url: '/assets/game/dyes/cape/2slots_Moments_RangerCape.jpg'},
  { guid: 'zhugp6XAdZ', url: '/assets/game/dyes/cape/2slots_Nesting_cape.jpg'},
  { guid: 'GaLyg5WMaC', url: '/assets/game/dyes/cape/2slots_Passage_CoatCape.jpg'},
  { guid: 'KoLgRv-HIL', url: '/assets/game/dyes/cape/2slots_Performance_storyteller.jpg'},
  { guid: 'mfNUas_ov2', url: '/assets/game/dyes/cape/2slots_Prophecy_BatCape.jpg'},
  { guid: 'K1EZHVX9Sb', url: '/assets/game/dyes/cape/2slots_Prophecy_SpiderCape.jpg'},
  { guid: 'EpgewHD2PP', url: '/assets/game/dyes/cape/2slots_Radiance_X.jpg'},
  { guid: 'Li5WaWrfs8', url: '/assets/game/dyes/cape/2slots_Radiance_fork.jpg'},
  { guid: 'EzIn2w-a7F', url: '/assets/game/dyes/cape/2slots_Radiance_star.jpg'},
  { guid: '-7DilSTRJc', url: '/assets/game/dyes/cape/2slots_Radiance_ult.jpg'},
  { guid: 'XimZaRVH06', url: '/assets/game/dyes/cape/2slots_Remembrance_tiptoe.jpg'},
  { guid: 'aVXNBBz0Qs', url: '/assets/game/dyes/cape/2slots_Remembrance_vet.jpg'},
  { guid: 'bXIUFu8eZ3', url: '/assets/game/dyes/cape/2slots_Revival_GratCape.jpg'},
  { guid: 'oVI6Qp4U_2', url: '/assets/game/dyes/cape/2slots_Revival_RhythmCape.jpg'},
  { guid: 'ygwSSn-NvK', url: '/assets/game/dyes/cape/2slots_Sanctuary_shell.jpg'},
  { guid: 'vNSMly5D9b', url: '/assets/game/dyes/cape/2slots_Sunlight_manta.jpg'},
  { guid: 'ldRJqNu7QX', url: '/assets/game/dyes/hair-accessory/2slots_Moments_rangerhat.jpg'},
  { guid: 'Gz6U0Ahkg5', url: '/assets/game/dyes/head-accessory/2slots_Passage_tassels.jpg'},
  { guid: 'aoo9OjQKpZ', url: '/assets/game/dyes/mask/2slots_Abyss_Cease.jpg'},
  { guid: 'P2xV7cdviC', url: '/assets/game/dyes/mask/2slots_Abyss_f2p.jpg'},
  { guid: 'zYUN2fkYOQ', url: '/assets/game/dyes/mask/2slots_Abyss_ult.jpg'},
  { guid: 'NdTO2GQkMc', url: '/assets/game/dyes/mask/2slots_Colour_mask.jpg'},
  { guid: 'HnCWgj7aoA', url: '/assets/game/dyes/mask/2slots_Fortune_blush.jpg'},
  { guid: 'kHq2VDev2Y', url: '/assets/game/dyes/mask/2slots_Gratitude_ult.jpg'},
  { guid: 'rFRaOxnvXF', url: '/assets/game/dyes/mask/2slots_Love_rose.jpg'},
  { guid: 'QeNQhxg3mv', url: '/assets/game/dyes/mask/2slots_Mischief_cat.jpg'},
  { guid: 'DBRlaSaues', url: '/assets/game/dyes/mask/2slots_Performance_ult.jpg'},
  { guid: 'uSSYbcdA1j', url: '/assets/game/dyes/mask/2slots_Radiance_ult.jpg'},
  { guid: 'xCPJYG39hD', url: '/assets/game/dyes/outfit/2slots_Abyss_angler.jpg'},
  { guid: 'VToGfUfrj1', url: '/assets/game/dyes/outfit/2slots_Assembly_chuckle.jpg'},
  { guid: 'qrP9vZPLlk', url: '/assets/game/dyes/outfit/2slots_Belonging_kid.jpg'},
  { guid: 'wUPw1TRQSI', url: '/assets/game/dyes/outfit/2slots_Bloom_gardener.jpg'},
  { guid: '9ETwx3n-UZ', url: '/assets/game/dyes/outfit/2slots_Color_DarkRainbowTunic.jpg'},
  { guid: '0rrPORrk7O', url: '/assets/game/dyes/outfit/2slots_Color_GaySuspenders.jpg'},
  { guid: 'n4sSWlUIbO', url: '/assets/game/dyes/outfit/2slots_Dreams_Yeti.jpg'},
  { guid: 'WTVL4L3IT-', url: '/assets/game/dyes/outfit/2slots_Duets_Cellist1.jpg'},
  { guid: 'tPukMxWUyv', url: '/assets/game/dyes/outfit/2slots_Duets_Cellist2.jpg'},
  { guid: 'tMT9whKoLk', url: '/assets/game/dyes/outfit/2slots_Duets_Pianist1.jpg'},
  { guid: 'svs-TcEdo-', url: '/assets/game/dyes/outfit/2slots_Duets_Pianist2.jpg'},
  { guid: 'g-vZeE8cmg', url: '/assets/game/dyes/outfit/2slots_Flight_Builder.jpg'},
  { guid: 'Y7j3ljNdYp', url: '/assets/game/dyes/outfit/2slots_Flight_LW.jpg'},
  { guid: '5Z5JqDkAtl', url: '/assets/game/dyes/outfit/2slots_Flight_chime.jpg'},
  { guid: 'SxX0bNDJaR', url: '/assets/game/dyes/outfit/2slots_Flight_ult.jpg'},
  { guid: 'ZmPfYe6tPD', url: '/assets/game/dyes/outfit/2slots_Fortune_Snake.jpg'},
  { guid: 'InwVEtmmcp', url: '/assets/game/dyes/outfit/2slots_Moments_Nightbird.jpg'},
  { guid: '6OKxFB9NFg', url: '/assets/game/dyes/outfit/2slots_Moments_monk.jpg'},
  { guid: '2e97D5cOuG', url: '/assets/game/dyes/outfit/2slots_Moonlight_robe.jpg'},
  { guid: 'n6S9sKtNlW', url: '/assets/game/dyes/outfit/2slots_Music_pants.jpg'},
  { guid: 'yN19ZpyYJH', url: '/assets/game/dyes/outfit/2slots_Nesting_ult.jpg'},
  { guid: 'aaYJbWm6oV', url: '/assets/game/dyes/outfit/2slots_Passage_Mope.jpg'},
  { guid: 'Py6sIw6EvE', url: '/assets/game/dyes/outfit/2slots_Passage_Oddball.jpg'},
  { guid: 'DFn3TnXyGw', url: '/assets/game/dyes/outfit/2slots_Performance_modest.jpg'},
  { guid: 'no0xArAFGq', url: '/assets/game/dyes/outfit/2slots_Performance_storyteller.jpg'},
  { guid: 'V9HhQcek_9', url: '/assets/game/dyes/outfit/2slots_Prophecy_fire.jpg'},
  { guid: 'sGfjk16HcV', url: '/assets/game/dyes/outfit/2slots_Radiance_Leap.jpg'},
  { guid: 'St7IlVNQvN', url: '/assets/game/dyes/outfit/2slots_Radiance_Provoke.jpg'},
  { guid: 'vXeFHcV4TF', url: '/assets/game/dyes/outfit/2slots_Radiance_Shaman.jpg'},
  { guid: 'eP_tdKr4R7', url: '/assets/game/dyes/outfit/2slots_Remembrance_child.jpg'},
  { guid: '4tYFGTPkMo', url: '/assets/game/dyes/outfit/2slots_Remembrance_tiptoe.jpg'},
  { guid: 'XPEhyUKiiy', url: '/assets/game/dyes/outfit/2slots_Remembrance_warrior.jpg'},
  { guid: 'uMURxUHDKr', url: '/assets/game/dyes/outfit/2slots_Rhythm_Actor.jpg'},
  { guid: 'T4suf1MdTj', url: '/assets/game/dyes/outfit/2slots_Rhythm_Greeter.jpg'},
  { guid: '52NbrdHrAf', url: '/assets/game/dyes/outfit/2slots_Rhythm_Juggler.jpg'},
  { guid: 'kmgKsVBs4o', url: '/assets/game/dyes/outfit/2slots_Rhythm_Spin.jpg'},
  { guid: 'E7RAu04_xI', url: '/assets/game/dyes/outfit/2slots_Style_jeans.jpg'},
  { guid: '4c-yCAGV5U', url: '/assets/game/dyes/outfit/2slots_Style_suit.jpg'},
  { guid: '_DzSz5REUk', url: '/assets/game/dyes/outfit/2slots_Sunlight_dadpants.jpg'},
];

const itemsPath = path.join(__dirname, '../src/assets/data/items');
const itemsFiles = fs.readdirSync(itemsPath, { recursive: true })
  .filter(f => f.match(/\.\w+$/i))
  .map(f => f.replace(/\\/g, '/'))
  .map(f => `${__dirname}/../src/assets/data/items/${f}`);

itemsFiles.forEach(file => {
  let json = fs.readFileSync(file, 'utf8');
  json = json.replace(/\r\n/g, '\n');

  let modified = false;

  for (const mapped of mappedFiles) {
    const iGuid = json.indexOf(mapped.guid);
    if (iGuid < 0) { continue; }
    let iStart = json.lastIndexOf('{', iGuid);
    if (iStart < 0) { continue; }
    let iEnd = json.indexOf('"id"', iGuid);
    if (iEnd < 0) { iEnd = json.length; }
    iEnd = json.lastIndexOf('}', iEnd) + 1;

    // console.log(mapped.guid);
    // console.log(json.slice(iStart, iEnd));

    const is2Slots = mapped.url.includes('2slots');

    if (!is2Slots) {
      // Add new dye section.
      const iDye = json.indexOf('"dye"', iGuid);
      if (iDye >= iStart &&  iDye <= iEnd) { continue; }
      let iLastBreak = json.lastIndexOf('\n', iEnd);

      const newDyeEntry = `,
    "dye": {
      "previewUrl": "${mapped.url}",
      "primary": {},
    }`;
      json = json.slice(0, iLastBreak) + newDyeEntry + json.slice(iLastBreak);
      modified = true;
    } else {
      // Add info URL.
      const iInfo = json.indexOf('"infoUrl"', iStart);
      if (iInfo >= iStart && iInfo <= iEnd) { continue; }

      const iDye = json.indexOf('"dye"', iGuid);
      if (iDye < iStart || iDye > iEnd) { continue; }

      const iPreview = json.indexOf('"previewUrl"', iDye);
      if (iPreview < iDye || iPreview > iEnd) { continue; }

      const iSecondary = json.indexOf('"secondary"', iPreview);
      if (iSecondary < iStart || iSecondary > iEnd) {
        console.warn('Missing secondary slot for:', mapped.guid);
      }

      let iBreak = json.indexOf('\n', iPreview);

      const newInfoEntry = `,
      "infoUrl": "${mapped.url}",`;
      json = json.slice(0, iBreak) + newInfoEntry + json.slice(iBreak);
      modified = true;
    }
  }

  if (modified) {
    ncp.writeSync(json);
    json = json.replace(/,,/g, ',').replace(/\n/g, '\r\n');
    fs.writeFileSync(file, json);
  }
})
// console.log(itemsFiles);
