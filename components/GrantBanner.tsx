/* eslint-disable @next/next/no-img-element */

/**
 * Povinná publicita dotačního projektu (NPO / NextGenerationEU / MK ČR).
 * Vykresluje se v layoutu na KAŽDÉ stránce těsně před footerem.
 */
export default function GrantBanner() {
  return (
    <section className="bg-[var(--snow-50)] border-t border-[var(--granite-300)]/30 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-9">
          <img
            src="/grant/eu-financovano.png"
            alt="Financováno Evropskou unií — NextGenerationEU"
            className="h-14 md:h-16 w-auto"
          />
          <img
            src="/grant/npo.png"
            alt="Národní plán obnovy"
            className="h-14 md:h-16 w-auto"
          />
          <img
            src="/grant/ministerstvo-kultury.jpg"
            alt="Ministerstvo kultury České republiky"
            className="h-14 md:h-16 w-auto"
          />
        </div>

        <div className="text-sm text-[var(--granite-600)] leading-relaxed space-y-3">
          <p>
            <strong className="text-[var(--spruce-950)]">
              Název projektu:
            </strong>{" "}
            Fotografická prezentace Chaty Jiřího na Šeráku, cyklus
            propagačních setů fotografií Chaty a blízkého okolí s cílem
            prodloužení pobytu turistů a rozšíření klientely.
          </p>
          <p>
            <strong className="text-[var(--spruce-950)]">Cíl projektu:</strong>{" "}
            Vznik profesionální databáze snímků pro komunikaci na sítích
            a tištěných výstupech, tak aby návštěvníci chtěli zůstat déle,
            než jen jednu noc. Představením různého vyžití v okolí a na
            Chatě, chceme zvýšit konkurenceschopnost a rozšířit návštěvnost
            místa mimo hlavní sezónu.
          </p>
          <p>
            Marketingové využití snímků buduje dlouhodobě vztah k místu, což
            je klíč k opakovaným návštěvám turistů. Zpomalením proudu
            návštěvníků se zároveň sníží ekologická zátěž ubytování pouze na
            jednu noc.
          </p>
          <p>
            Projekt je plánován jako součást trvalého procesu mnohaleté
            obrody Chaty a jejího okolí.
          </p>
        </div>
      </div>
    </section>
  );
}
