import React, { useState, useEffect } from 'react';
import { Calculator, Beaker, Utensils, ChefHat } from 'lucide-react';

export default function PizzaCalculator() {
  const [numPizzas, setNumPizzas] = useState(4);
  const [pizzaWeight, setPizzaWeight] = useState(273);
  const [hydration, setHydration] = useState(62);
  const [breadFlour, setBreadFlour] = useState(80);
  const [wholeWheat, setWholeWheat] = useState(20);
  const [poolishPercent, setPoolishPercent] = useState(30);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    calculateRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPizzas, hydration, breadFlour, wholeWheat, pizzaWeight, poolishPercent]);

  const calculateRecipe = () => {
    const totalDough = numPizzas * pizzaWeight;
    const salt = 2;
    const yeast = 0.3;
    
    const totalFlour = totalDough / (1 + (hydration/100) + (salt/100) + (yeast/100));
    const totalWater = totalFlour * (hydration / 100);
    const totalSalt = totalFlour * (salt / 100);
    const totalYeast = totalFlour * (yeast / 100);
    
    const breadFlourTotal = totalFlour * (breadFlour / 100);
    const wholeWheatTotal = totalFlour * (wholeWheat / 100);
    
    // Poolish flour distributed proportionally based on flour mix
    const poolishFlourTotal = totalFlour * (poolishPercent / 100);
    const poolishBreadFlour = poolishFlourTotal * (breadFlour / 100);
    const poolishWholeWheat = poolishFlourTotal * (wholeWheat / 100);
    const poolishWater = poolishFlourTotal; // 100% hydration
    const poolishYeast = totalYeast;
    
    // Final dough
    const finalWater = totalWater - poolishWater;
    const finalBreadFlour = breadFlourTotal - poolishBreadFlour;
    const finalWholeWheat = wholeWheatTotal - poolishWholeWheat;
    const finalSalt = totalSalt;
    
    setRecipe({
      poolish: {
        yeast: poolishYeast,
        water: poolishWater,
        breadFlour: poolishBreadFlour,
        wholeWheat: poolishWholeWheat
      },
      final: {
        water: finalWater,
        breadFlour: finalBreadFlour,
        wholeWheat: finalWholeWheat,
        salt: finalSalt
      },
      totals: {
        flour: totalFlour,
        water: totalWater,
        salt: totalSalt,
        yeast: totalYeast,
        dough: totalDough,
        poolishWeight: poolishFlourTotal + poolishWater + poolishYeast
      }
    });
  };

  const round = (num) => Math.round(num * 10) / 10;
  
  const formatWeight = (grams) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(2)}kg`;
    }
    return `${round(grams)}g`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-xl text-white shadow-lg">
              <ChefHat size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dough Lab</h1>
              <p className="text-gray-600">Professional poolish-based pizza engineering</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Parameters Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5" /> Parameters
                </h2>
              </div>
              <div className="p-6 space-y-8">
                {/* Number of Pizzas */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-600">Pizzas</label>
                    <span className="text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg">{numPizzas}</span>
                  </div>
                  <input 
                    type="range"
                    value={numPizzas}
                    min={1}
                    max={400}
                    step={1}
                    onChange={(e) => setNumPizzas(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Pizza Weight */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-600">Weight (g)</label>
                    <span className="text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg">{pizzaWeight}</span>
                  </div>
                  <input 
                    type="range"
                    value={pizzaWeight}
                    min={150}
                    max={400}
                    step={5}
                    onChange={(e) => setPizzaWeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Hydration */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-600">Hydration (%)</label>
                    <span className="text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg">{hydration}%</span>
                  </div>
                  <input 
                    type="range"
                    value={hydration}
                    min={50}
                    max={80}
                    step={1}
                    onChange={(e) => setHydration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Poolish Percent */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-600">Poolish (%)</label>
                    <span className="text-lg font-mono font-bold bg-gray-100 px-3 py-1 rounded-lg">{poolishPercent}%</span>
                  </div>
                  <input 
                    type="range"
                    value={poolishPercent}
                    min={10}
                    max={50}
                    step={1}
                    onChange={(e) => setPoolishPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                {/* Flour Mix */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-600">Flour Mix</label>
                    <div className="flex gap-2">
                      <span className="text-xs font-mono bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">Bread: {breadFlour}%</span>
                      <span className="text-xs font-mono bg-amber-100 text-amber-700 px-2 py-1 rounded font-semibold">WW: {wholeWheat}%</span>
                    </div>
                  </div>
                  <input 
                    type="range"
                    value={breadFlour}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBreadFlour(val);
                      setWholeWheat(100 - val);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Poolish and Final Dough Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Poolish Card */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 overflow-hidden">
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 px-5 py-3 border-b border-orange-200">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-orange-800 uppercase tracking-widest">
                    <Beaker className="h-4 w-4" /> Poolish
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Yeast</span>
                    <span className="font-mono font-bold">{formatWeight(recipe.poolish?.yeast)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Water</span>
                    <span className="font-mono font-bold">{formatWeight(recipe.poolish?.water)}</span>
                  </div>
                  {recipe.poolish?.breadFlour > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bread Flour</span>
                      <span className="font-mono font-bold">{formatWeight(recipe.poolish?.breadFlour)}</span>
                    </div>
                  )}
                  {recipe.poolish?.wholeWheat > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">WW Flour</span>
                      <span className="font-mono font-bold">{formatWeight(recipe.poolish?.wholeWheat)}</span>
                    </div>
                  )}
                  <div className="pt-3 mt-3 border-t-2 border-orange-100 flex justify-between font-bold">
                    <span className="text-gray-700">Total</span>
                    <span className="font-mono text-orange-600 text-lg">{formatWeight(recipe.totals?.poolishWeight)}</span>
                  </div>
                </div>
              </div>

              {/* Final Dough Card */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 px-5 py-3 border-b border-amber-200">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-amber-800 uppercase tracking-widest">
                    <Utensils className="h-4 w-4" /> Final Dough
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm italic text-gray-500">
                    <span>All Poolish</span>
                    <span>&larr;</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Water</span>
                    <span className="font-mono font-bold">{formatWeight(recipe.final?.water)}</span>
                  </div>
                  {recipe.final?.breadFlour > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bread Flour</span>
                      <span className="font-mono font-bold">{formatWeight(recipe.final?.breadFlour)}</span>
                    </div>
                  )}
                  {recipe.final?.wholeWheat > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">WW Flour</span>
                      <span className="font-mono font-bold">{formatWeight(recipe.final?.wholeWheat)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salt (2%)</span>
                    <span className="font-mono font-bold">{formatWeight(recipe.final?.salt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700">Preparation Protocol</h3>
              </div>
              <div className="p-6">
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">1</span>
                    <p className="text-gray-700">Mix <span className="font-semibold text-orange-600">Poolish</span> and ferment <span className="font-medium">8-12 hours</span> at 15-27°C (60-80°F) until tripled and bubbly.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">2</span>
                    <p className="text-gray-700">Combine all final dough ingredients with the poolish. Rest for <span className="font-medium">30 mins</span> (autolyse).</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">3</span>
                    <p className="text-gray-700">Perform slap and folds. Rest for <span className="font-medium">30 mins</span>.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">4</span>
                    <p className="text-gray-700">Round the dough. Bulk ferment <span className="font-medium">1 hour</span> until active.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">5</span>
                    <p className="text-gray-700">Divide into {numPizzas} balls ({pizzaWeight}g). Proof <span className="font-medium">1-2 hours</span> before baking.</p>
                  </li>
                </ol>
              </div>
            </div>

            {/* Summary Bar */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest opacity-90">Total Batch</span>
                  <span className="text-4xl font-black font-mono tracking-tight">{formatWeight(recipe.totals?.dough)}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs uppercase font-bold tracking-widest opacity-90">Total Flour</span>
                  <span className="text-2xl font-bold font-mono">{formatWeight(recipe.totals?.flour)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
