import type { Effect } from "./AbilityEffect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  effect: Effect;
  onChange: (key: keyof Effect, value: string) => void;
}

export default function EffectForm({ effect, onChange }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-base">効果の種類</Label>
        <Select
          value={effect.effectType}
          onValueChange={(value) => onChange("effectType", value ?? "")}>
          <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
            <SelectValue placeholder="種類を選択"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="damage">
              ダメージ
            </SelectItem>
            <SelectItem value="heal">
              回復
            </SelectItem>
            <SelectItem value="special">
              特殊状態
            </SelectItem>
            <SelectItem value="draw">
              ドロー
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {effect.effectType === "special" && (
        <div className="space-y-2">
          <Label className="text-base">特殊効果の内容を指定</Label>
          <Select
            value={effect.specialStatus}
            onValueChange={(value) => onChange("specialStatus", value ?? "")}
          >
            <SelectTrigger className="border-[#1e1f22] bg-[#a4a4a5]">
              <SelectValue placeholder="種類を選択"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="poison">
                毒
              </SelectItem>
              <SelectItem value="stan">
                スタン
              </SelectItem>
              <SelectItem value="ghost">
                呪い
              </SelectItem>
              <SelectItem value="rock_on">
                ロックオン
              </SelectItem>
              <SelectItem value="explotion">
                爆破
              </SelectItem>
              <SelectItem value="not_move">
                行動不能
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-base">効果対象</Label>
        <Select
          value={effect.target}
          onValueChange={(value) => onChange("target", value ?? "")}>
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
        <Label className="text-base">数値(ダメージ・枚数など)</Label>
        <Input
          type="number"
          placeholder="例: 50"
          value={effect.valueNumber ?? ""}
          onChange={(e) => onChange("valueNumber", e.target.value)}
          className="border-[#1e1f22] bg-[#a4a4a5] text-whit"
        />
      </div>
    </>
  )
}