import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select"


export default function AbilityCondition() {
  return (
    <Card className="border-0 bg-[#232428] text-white p-2 mt-2">
      <CardHeader className="text-lg">
        発動条件
      </CardHeader>

      <CardContent className="mt-2 space-y-6">
        <div className="space-y-2">
          <Label className="text-base">発動タイミング</Label>
          <Select>
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="発動タイミングを選択します"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on_play">
                登場時
              </SelectItem>
              <SelectItem value="on_attack">
                攻撃時
              </SelectItem>
              <SelectItem value="on_damage">
                ダメージを受けた時
              </SelectItem>
              <SelectItem value="on_turn_start">
                ターン開始時
              </SelectItem>
              <SelectItem value="on_turn_end">
                ターン終了時
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base">条件の対象</Label>
          <Select>
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="対象を選択します"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self">
                自分
              </SelectItem>
              <SelectItem value="ally_only">
                自分以外の味方一人
              </SelectItem>
              <SelectItem value="ally_all">
                味方全体
              </SelectItem>
              <SelectItem value="enemy_self">
                相手
              </SelectItem>
              <SelectItem value="enemy_only">
                敵の一人
              </SelectItem>
              <SelectItem value="enemy_all">
                敵全体
              </SelectItem>
              <SelectItem value="all">
                全員
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base">条件</Label>
          <Input
            type="number"
            placeholder="例: 50"
            className="border-[#1e1f22] bg-[#a4a4a5] text-whit"
          />
        </div>
        <Button
          variant="outline"
          className="bg-blue-200 hover:bg-blue-400 text-black"
        >
          条件を保存する
        </Button>
        <Button
          variant="outline"
          className="ml-2 bg-blue-200 hover:bg-blue-400 text-black"
        >
          保存せずに戻る
        </Button>
      </CardContent>
    </Card>
  )
}