import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { bricknboltCompareData } from '../data/bricknboltCompare'
import '../package-pages.css'

function PackageComparePage() {
  const { heading, city, typeOptions, packages, sections } = bricknboltCompareData

  const packageIndexes = packages.map((_, index) => index)
  const defaultType = typeOptions.find((type) => type.selected)?.name ?? typeOptions[0]?.name ?? 'Homes'

  const [selectedType, setSelectedType] = useState(defaultType)
  const [highlightDifferences, setHighlightDifferences] = useState(false)
  const [selectedPackageIndexes, setSelectedPackageIndexes] = useState<number[]>(packageIndexes)

  const togglePackage = (index: number) => {
    setSelectedPackageIndexes((previous) => {
      if (previous.includes(index)) {
        if (previous.length <= 2) {
          return previous
        }
        return previous.filter((entry) => entry !== index)
      }

      return [...previous, index].sort((a, b) => a - b)
    })
  }

  const visiblePackageIndexes = selectedPackageIndexes.length > 0 ? selectedPackageIndexes : packageIndexes
  const visiblePackages = visiblePackageIndexes.map((index) => packages[index])

  const visibleSections = useMemo(() => {
    const isDifferentRow = (values: string[]): boolean => {
      const rowValues = visiblePackageIndexes
        .map((index) => values[index] ?? '-')
        .map((value) => value.trim().toLowerCase())
      return new Set(rowValues).size > 1
    }

    return sections
      .map((section) => ({
        ...section,
        rows: section.rows.filter((row) => !highlightDifferences || isDifferentRow(row.values)),
      }))
      .filter((section) => section.rows.length > 0)
  }, [highlightDifferences, sections, visiblePackageIndexes])

  const showSnapshotNotice = selectedType !== defaultType

  return (
    <main className="pkg-page-bg bnb-page-bg">
      <section className="pkg-page-wrap bnb-page-wrap">
        <header className="bnb-page-header">
          <h1>{heading}</h1>
          <Link className="bnb-back-home" to="/">
            Back To Home
          </Link>
        </header>

        <div className="bnb-filter-bar">
          <button className="bnb-city-chip" type="button">
            {city}
          </button>

          <div className="bnb-type-block">
            <span>Type:</span>
            <div className="bnb-type-list">
              {typeOptions.map((type) => {
                const isSelected = selectedType === type.name

                return (
                  <button
                    key={type.name}
                    type="button"
                    className={`bnb-type-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedType(type.name)}
                  >
                    <span className={`bnb-type-radio ${isSelected ? 'is-selected' : ''}`} />
                    <span className="bnb-type-copy">
                      <strong>{type.name}</strong>
                      <small>{type.description}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bnb-select-row">
          <p>Select Packages to compare:</p>
          <div className="bnb-selector-grid">
            {packages.map((pkg, index) => {
              const isSelected = visiblePackageIndexes.includes(index)
              return (
                <button
                  key={pkg.name}
                  type="button"
                  className={`bnb-selector-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => togglePackage(index)}
                  disabled={!isSelected && visiblePackageIndexes.length >= 4}
                >
                  <strong>{pkg.name}</strong>
                  <span>{pkg.price}</span>
                </button>
              )
            })}
          </div>
          <small>At least 2 packages should remain selected.</small>
        </div>

        {showSnapshotNotice && (
          <p className="bnb-snapshot-note">
            Showing {selectedType} view with the same table structure from current snapshot data.
          </p>
        )}

        <div className="bnb-compare-shell">
          <div className="bnb-top-row">
            <button
              className={`bnb-diff-toggle ${highlightDifferences ? 'is-active' : ''}`}
              type="button"
              onClick={() => setHighlightDifferences((previous) => !previous)}
            >
              <span aria-hidden="true">{highlightDifferences ? '\u2713' : ''}</span>
              Highlight differences
            </button>

            <div className="bnb-package-grid">
              {visiblePackages.map((pkg) => (
                <div key={pkg.name} className="bnb-package-pill">
                  <strong>{pkg.name}</strong>
                  <p>{pkg.price}</p>
                </div>
              ))}
            </div>
          </div>

          {visibleSections.map((section) => (
            <section key={section.title} className="bnb-section">
              <header className="bnb-section-head">
                <h2>{section.title}</h2>
                {section.subtitle && <p>{section.subtitle}</p>}
              </header>

              <div className="bnb-table-scroll">
                <table className="bnb-table">
                  <tbody>
                    {section.rows.map((row, rowIndex) => {
                      const rowValues = visiblePackageIndexes.map((index) => row.values[index] ?? '-')
                      const diffClass =
                        new Set(rowValues.map((value) => value.trim().toLowerCase())).size > 1 ? 'has-difference' : ''

                      return (
                        <tr key={`${section.title}-${row.feature}-${rowIndex}`} className={diffClass}>
                          <th scope="row">
                            <p className="bnb-feature">{row.feature}</p>
                            {row.featureDescription && <p className="bnb-feature-desc">{row.featureDescription}</p>}
                          </th>
                          {rowValues.map((value, valueIndex) => (
                            <td
                              key={`${section.title}-${rowIndex}-${valueIndex}`}
                              className={value === 'Yes' ? 'is-yes' : value === 'No' ? 'is-no' : ''}
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {section.disclaimer && <p className="bnb-disclaimer">{section.disclaimer}</p>}
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}

export default PackageComparePage
