import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function Index() {
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const upgradeCost = 25;
  const canUpgrade = coins >= upgradeCost;

  const handleCoinClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoins(prev => prev + clickPower);
    setTotalClicks(prev => prev + 1);
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const newParticle = { id: Date.now(), x, y };
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const handleUpgrade = () => {
    if (canUpgrade) {
      setCoins(prev => prev - upgradeCost);
      setClickPower(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--neon-cyan))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] neon-glow mb-2">
            CYBER CLICKER
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Кликай монету и улучшайся</p>
        </header>

        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-card border border-primary/20">
            <TabsTrigger value="game" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Игра
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              <Icon name="Trophy" size={16} className="mr-2" />
              Достижения
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Crown" size={16} className="mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/30 neon-box text-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Баланс</p>
                    <p className="text-3xl font-bold">{coins}</p>
                  </div>
                  <Icon name="Coins" size={40} className="text-primary animate-glow-pulse" />
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-secondary/30 neon-box text-secondary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Сила клика</p>
                    <p className="text-3xl font-bold">{clickPower}</p>
                  </div>
                  <Icon name="Zap" size={40} className="text-secondary animate-glow-pulse" />
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-accent/30 neon-box text-accent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Всего кликов</p>
                    <p className="text-3xl font-bold">{totalClicks}</p>
                  </div>
                  <Icon name="MousePointerClick" size={40} className="text-accent animate-glow-pulse" />
                </div>
              </Card>
            </div>

            <Card className="p-8 md:p-12 bg-card/30 backdrop-blur border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
              
              <div className="text-center space-y-6 relative z-10">
                <div
                  onClick={handleCoinClick}
                  className={`relative mx-auto w-48 h-48 md:w-64 md:h-64 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isAnimating ? 'animate-coin-flip' : ''
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--neon-cyan))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] animate-pulse-glow" />
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center border-4 border-primary/50">
                    <Icon name="Coins" size={96} className="text-primary neon-glow" />
                  </div>
                  
                  {particles.map(particle => (
                    <div
                      key={particle.id}
                      className="absolute text-2xl font-bold text-primary animate-particle-float pointer-events-none"
                      style={{
                        left: particle.x,
                        top: particle.y,
                        textShadow: '0 0 10px currentColor'
                      }}
                    >
                      +{clickPower}
                    </div>
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-muted-foreground">
                  Кликай по монете!
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Zap" size={32} className="text-secondary" />
                    <h3 className="text-2xl font-bold text-secondary">Увеличение силы клика</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Увеличивает количество монет за один клик на +1
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-lg px-4 py-2 border-primary/50">
                      <Icon name="Coins" size={16} className="mr-2" />
                      Стоимость: {upgradeCost}
                    </Badge>
                    <Badge variant="outline" className="text-lg px-4 py-2 border-secondary/50">
                      Текущий уровень: {clickPower}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={handleUpgrade}
                  disabled={!canUpgrade}
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 disabled:opacity-50 disabled:cursor-not-allowed neon-box text-secondary border-secondary/50"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur border-muted/30 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Lock" size={24} className="text-muted-foreground" />
                <h3 className="text-xl font-bold text-muted-foreground">Автокликер</h3>
              </div>
              <p className="text-muted-foreground text-sm">Скоро появится...</p>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur border-muted/30 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Lock" size={24} className="text-muted-foreground" />
                <h3 className="text-xl font-bold text-muted-foreground">Мультипликатор</h3>
              </div>
              <p className="text-muted-foreground text-sm">Скоро появится...</p>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-8 bg-card/30 backdrop-blur border-accent/20 text-center">
              <Icon name="Trophy" size={64} className="mx-auto mb-4 text-accent/50" />
              <h3 className="text-2xl font-bold mb-2">Достижения</h3>
              <p className="text-muted-foreground">Система достижений появится в следующем обновлении</p>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="p-8 bg-card/30 backdrop-blur border-primary/20 text-center">
              <Icon name="Crown" size={64} className="mx-auto mb-4 text-primary/50" />
              <h3 className="text-2xl font-bold mb-2">Таблица лидеров</h3>
              <p className="text-muted-foreground">Рейтинг игроков появится в следующем обновлении</p>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/30">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="MousePointerClick" size={32} className="text-primary" />
                  <h3 className="text-xl font-bold">Общая статистика</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Всего кликов</span>
                    <span className="text-2xl font-bold text-primary">{totalClicks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Заработано монет</span>
                    <span className="text-2xl font-bold text-secondary">{coins + (clickPower - 1) * upgradeCost}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-secondary/30">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="TrendingUp" size={32} className="text-secondary" />
                  <h3 className="text-xl font-bold">Прогресс</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Уровень силы клика</span>
                    <span className="text-2xl font-bold text-accent">{clickPower}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Потрачено на улучшения</span>
                    <span className="text-2xl font-bold text-primary">{(clickPower - 1) * upgradeCost}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
